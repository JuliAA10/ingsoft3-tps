import { describe, expect, it } from "vitest";
import { formatCurrency, formatDuration } from "./utils";

describe("formatDuration", () => {
  it.each([
    [0, "00:00:00"],
    [59, "00:00:59"],
    [60, "00:01:00"],
    [3600, "01:00:00"],
    [5400, "01:30:00"],
    [3661, "01:01:01"],
  ])("convierte %i segundos en %s", (seconds, expected) => {
    // Arrange: los datos llegan desde la tabla.

    // Act
    const result = formatDuration(seconds);

    // Assert
    expect(result).toBe(expected);
  });

  it("conserva las horas acumuladas por encima de un día", () => {
    // Arrange
    const seconds = 25 * 3600;

    // Act
    const result = formatDuration(seconds);

    // Assert
    expect(result).toBe("25:00:00");
  });
});

describe("formatCurrency", () => {
  it("muestra dólares con separador de miles y dos decimales", () => {
    // Arrange
    const amount = 1234.5;

    // Act
    const result = formatCurrency(amount);

    // Assert
    expect(result).toBe("$1,234.50");
  });
});
