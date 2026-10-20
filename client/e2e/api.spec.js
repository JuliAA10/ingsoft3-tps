import { test as base, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Falta configurar ${name}`);
  return value;
};

const API = required("API_BASE_URL").replace(/\/$/, "");
const EMAIL = required("QA_TEST_EMAIL");
const PASSWORD = required("QA_TEST_PASSWORD");

const unique = (prefix) => `${prefix}-${Date.now()}-${randomUUID()}`;

// Usa la API real y limpia únicamente los proyectos de este test.
const test = base.extend({
  api: async ({ request }, use) => {
    const login = await request.post(`${API}/api/auth/login`, {
      data: { email: EMAIL, password: PASSWORD },
      timeout: 120_000,
    });

    expect(login.status()).toBe(200);
    const { token } = await login.json();
    expect(token).toBeTruthy();

    const headers = { Authorization: `Bearer ${token}` };
    const createdIds = new Set();

    const getProjects = async () => {
      const response = await request.get(`${API}/api/projects`, {
        headers,
      });
      expect(response.status()).toBe(200);
      return response.json();
    };

    const getProject = (id) =>
      request.get(`${API}/api/projects/${id}`, { headers });

    const createProject = async (data) => {
      const response = await request.post(`${API}/api/projects`, {
        headers,
        data,
      });
      const body = await response.json();

      // También registra un alta inválida si la API la acepta por error.
      if (response.ok() && Number.isInteger(body.ID)) {
        createdIds.add(body.ID);
      }

      return { response, body };
    };

    const deleteProject = async (id) => {
      const response = await request.delete(`${API}/api/projects/${id}`, {
        headers,
      });
      expect(response.status()).toBe(204);

      const lookup = await getProject(id);
      expect(lookup.status()).toBe(404);
      createdIds.delete(id);
    };

    try {
      await use({
        getProjects,
        getProject,
        createProject,
        deleteProject,
      });
    } finally {
      // Se ejecuta también cuando falla una afirmación.
      for (const id of createdIds) {
        await deleteProject(id);
      }
    }
  },
});

test("crear, encontrar y borrar un proyecto", async ({ api }) => {
  const name = unique("api-alta");

  const { response, body } = await api.createProject({
    name,
    description: "Proyecto temporal del TP7",
    hourly_rate: 50,
  });

  expect(response.status()).toBe(201);
  expect(body.ID).toBeGreaterThan(0);

  const projects = await api.getProjects();
  expect(projects).toEqual(
    expect.arrayContaining([expect.objectContaining({ ID: body.ID, name })]),
  );

  await api.deleteProject(body.ID);

  const remaining = await api.getProjects();
  expect(remaining.some((project) => project.ID === body.ID)).toBe(false);
});

test("rechazar nombre vacío sin crear un proyecto", async ({ api }) => {
  const marker = unique("api-invalido");

  const { response, body } = await api.createProject({
    name: "",
    description: marker,
    hourly_rate: 50,
  });

  expect(response.status()).toBe(400);
  expect(body.error).toBe("Project name is required");

  const projects = await api.getProjects();
  expect(projects.some((project) => project.description === marker)).toBe(
    false,
  );
});

test("recuperar nombre, descripción y tarifa desde la base", async ({
  api,
}) => {
  const data = {
    name: unique("api-detalle"),
    description: unique("descripcion"),
    hourly_rate: 75.5,
  };

  const { response, body } = await api.createProject(data);
  expect(response.status()).toBe(201);

  const lookup = await api.getProject(body.ID);
  expect(lookup.status()).toBe(200);

  const saved = await lookup.json();
  expect(saved).toMatchObject({
    ID: body.ID,
    name: data.name,
    description: data.description,
    hourly_rate: data.hourly_rate,
  });

  await api.deleteProject(body.ID);
});
