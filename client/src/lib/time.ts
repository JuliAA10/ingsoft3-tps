// Calcula segundos completos entre dos instantes.
// Acepta duración cero y rechaza fechas inválidas o un intervalo invertido.
export function calculateDuration(
  start: string | Date,
  end: string | Date,
): number {
  const startMs =
    start instanceof Date ? start.getTime() : new Date(start).getTime();

  const endMs = end instanceof Date ? end.getTime() : new Date(end).getTime();

  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) {
    throw new Error("Las fechas de inicio y fin deben ser válidas");
  }

  if (endMs < startMs) {
    throw new Error("El fin no puede ser anterior al inicio");
  }

  return Math.floor((endMs - startMs) / 1000);
}
