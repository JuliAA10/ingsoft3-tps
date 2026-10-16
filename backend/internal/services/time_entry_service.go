package services

import (
	"errors"
	"time"
)

// CalculateDuration devuelve la duración en segundos.
// Aceptamos duración cero, pero rechazamos fechas faltantes
// y un final anterior al inicio.
func CalculateDuration(start, end time.Time) (int64, error) {
	if start.IsZero() || end.IsZero() {
		return 0, errors.New("inicio y fin son obligatorios")
	}

	if end.Before(start) {
		return 0, errors.New("el fin no puede ser anterior al inicio")
	}

	return end.Unix() - start.Unix(), nil
}
