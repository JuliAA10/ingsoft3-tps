import { describe, expect, it, vi } from "vitest";
import axios from "@/lib/axios";
import { invoicesApi } from "./invoices";

// Reemplaza el cliente HTTP antes de ejecutar el módulo bajo prueba.
vi.mock("@/lib/axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("invoicesApi.generate", () => {
  it("envía los datos al endpoint y devuelve la factura recibida", async () => {
    // Arrange
    const request = {
      projectId: 7,
      startDate: "2026-10-01",
      endDate: "2026-10-14",
    };

    const invoice = {
      id: "invoice-1",
      projectName: "Proyecto de prueba",
      startDate: request.startDate,
      endDate: request.endDate,
      totalHours: 1.5,
      hourlyRate: 100,
      totalAmount: 150,
      entries: [{ date: "2026-10-12", hours: 1.5 }],
    };

    vi.mocked(axios.post).mockResolvedValueOnce({
      data: invoice,
    });

    // Act
    const result = await invoicesApi.generate(request);

    // Assert
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/invoices/generate", request);
    expect(result).toEqual(invoice);
  });

  it("propaga el error cuando falla la solicitud", async () => {
    // Arrange
    const request = {
      projectId: 7,
      startDate: "2026-10-01",
      endDate: "2026-10-14",
    };

    const error = new Error("No se pudo generar la factura");
    vi.mocked(axios.post).mockRejectedValueOnce(error);

    // Act
    const operation = invoicesApi.generate(request);

    // Assert
    await expect(operation).rejects.toBe(error);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
