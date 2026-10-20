import { test as base, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Falta configurar ${name}`);
  return value;
};

const API = required("API_BASE_URL").replace(/\/$/, "");
const FRONT = required("E2E_BASE_URL").replace(/\/$/, "");
const EMAIL = required("QA_TEST_EMAIL");
const PASSWORD = required("QA_TEST_PASSWORD");

const unique = (prefix) => `${prefix}-${Date.now()}-${randomUUID()}`;

const test = base.extend({
  session: async ({ page, request }, use) => {
    // Autenticación para verificar y limpiar datos directamente en la API.
    const login = await request.post(`${API}/api/auth/login`, {
      data: { email: EMAIL, password: PASSWORD },
      timeout: 120_000,
    });
    expect(login.status()).toBe(200);

    const { token } = await login.json();
    expect(token).toBeTruthy();

    const headers = { Authorization: `Bearer ${token}` };
    const names = new Set();
    const descriptions = new Set();

    const listProjects = async () => {
      const response = await request.get(`${API}/api/projects`, {
        headers,
      });
      expect(response.status()).toBe(200);
      return response.json();
    };

    const belongsToTest = (project) =>
      names.has(project.name) || descriptions.has(project.description);

    try {
      // El navegador también inicia sesión usando la pantalla real.
      await page.goto("/login");
      await page.getByLabel("Email", { exact: true }).fill(EMAIL);
      await page.getByLabel("Password", { exact: true }).fill(PASSWORD);
      await page
        .getByRole("button", {
          name: "Sign in",
          exact: true,
        })
        .click();

      await expect(page).toHaveURL(`${FRONT}/`);
      await page.goto("/projects");
      await expect(
        page.getByRole("heading", {
          name: "Projects",
          exact: true,
        }),
      ).toBeVisible();

      await use({
        names,
        descriptions,
        listProjects,
        headers,
      });
    } finally {
      // Limpieza de respaldo si el test falla antes de borrar por pantalla.
      const projects = await listProjects();

      for (const project of projects.filter(belongsToTest)) {
        const deletion = await request.delete(
          `${API}/api/projects/${project.ID}`,
          { headers },
        );
        expect(deletion.status()).toBe(204);

        const lookup = await request.get(`${API}/api/projects/${project.ID}`, {
          headers,
        });
        expect(lookup.status()).toBe(404);
      }

      const remaining = await listProjects();
      expect(remaining.filter(belongsToTest)).toHaveLength(0);
    }
  },
});

async function createProject(page, session, rate = "50") {
  const name = unique("e2e-proyecto");
  session.names.add(name);

  await page
    .getByRole("button", {
      name: "New Project",
      exact: true,
    })
    .click();

  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Project Name", { exact: true }).fill(name);
  await dialog
    .getByLabel("Description", { exact: true })
    .fill("Proyecto temporal del TP7");
  await dialog.getByLabel("Hourly Rate ($)", { exact: true }).fill(rate);

  const responsePromise = page.waitForResponse(
    (response) =>
      new URL(response.url()).pathname === "/api/projects" &&
      response.request().method() === "POST",
  );

  await dialog
    .getByRole("button", {
      name: "Create Project",
      exact: true,
    })
    .click();

  const response = await responsePromise;
  expect(response.status()).toBe(201);

  const project = await response.json();
  expect(project.ID).toBeGreaterThan(0);
  await expect(dialog).toBeHidden();
  await expect(page.getByText(name, { exact: true })).toBeVisible();

  return { id: project.ID, name };
}

async function deleteProject(page, request, session, project) {
  await page.goto(`/projects/${project.id}`);

  await expect(
    page.getByRole("heading", {
      name: project.name,
      exact: true,
    }),
  ).toBeVisible();

  await page
    .getByRole("button", {
      name: "Delete Project",
      exact: true,
    })
    .click();

  await page
    .getByRole("alertdialog")
    .getByRole("button", {
      name: "Delete",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL(`${FRONT}/projects`);
  await expect(page.getByText(project.name, { exact: true })).toHaveCount(0);

  const lookup = await request.get(`${API}/api/projects/${project.id}`, {
    headers: session.headers,
  });
  expect(lookup.status()).toBe(404);
}

test("crear un proyecto, verlo y borrarlo", async ({
  page,
  request,
  session,
}) => {
  const project = await createProject(page, session);
  await deleteProject(page, request, session, project);
});

test("mostrar un error por nombre inválido sin guardar", async ({
  page,
  session,
}) => {
  const marker = unique("e2e-invalido");
  session.descriptions.add(marker);

  await page
    .getByRole("button", {
      name: "New Project",
      exact: true,
    })
    .click();

  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Project Name", { exact: true }).fill("   ");
  await dialog.getByLabel("Description", { exact: true }).fill(marker);
  await dialog
    .getByRole("button", {
      name: "Create Project",
      exact: true,
    })
    .click();

  await expect(dialog.getByRole("alert")).toHaveText(
    "Project name is required",
  );

  const projects = await session.listProjects();
  expect(projects.some((project) => project.description === marker)).toBe(
    false,
  );
});

test("conservar el proyecto y su tarifa después de recargar", async ({
  page,
  request,
  session,
}) => {
  const project = await createProject(page, session, "75.5");

  await page.reload();
  await expect(page.getByText(project.name, { exact: true })).toBeVisible();

  await page.locator(`a[href="/projects/${project.id}"]`).click();

  await expect(
    page.getByRole("heading", {
      name: project.name,
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByText("$75.5", { exact: true })).toBeVisible();

  await deleteProject(page, request, session, project);
});
