import { describe, expect, it } from "vitest";
import { calculateDuration } from "./time";

describe("calculateDuration", () => {
  it.each([
    ["2026-10-15T10:00:00Z", "2026-10-15T11:30:00Z", 5400],
    ["2026-10-15T10:00:00Z", "2026-10-15T10:00:00Z", 0],
    ["2026-10-15T23:30:00Z", "2026-10-16T00:30:00Z", 3600],
  ])("calcula el intervalo entre %s y %s", (start, end, expected) => {
    // Arrange: datos de la tabla.

    // Act
    const result = calculateDuration(start, end);

    // Assert
    expect(result).toBe(expected);
  });

  it("acepta objetos Date y descarta fracciones de segundo", () => {
    // Arrange
    const start = new Date("2026-10-15T10:00:00.000Z");
    const end = new Date("2026-10-15T10:00:01.900Z");

    // Act
    const result = calculateDuration(start, end);

    // Assert
    expect(result).toBe(1);
  });

  it.each([
    ["", "2026-10-15T11:00:00Z"],
    ["2026-10-15T10:00:00Z", ""],
    ["no-es-una-fecha", "2026-10-15T11:00:00Z"],
  ])("rechaza fechas inválidas: %s / %s", (start, end) => {
    // Act y Assert: la llamada se envuelve para comprobar el error.
    expect(() => calculateDuration(start, end)).toThrow(
      "Las fechas de inicio y fin deben ser válidas",
    );
  });

  it("rechaza un fin anterior al inicio", () => {
    // Arrange
    const start = "2026-10-15T11:00:00Z";
    const end = "2026-10-15T10:00:00Z";

    // Act y Assert
    expect(() => calculateDuration(start, end)).toThrow(
      "El fin no puede ser anterior al inicio",
    );
  });
});
