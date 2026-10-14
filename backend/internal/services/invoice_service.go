package services

import "timetracker/internal/models"

// SecondsToHours convierte segundos a horas, incluyendo fracciones.
func SecondsToHours(seconds int64) float64 {
	return float64(seconds) / 3600
}

// CalculateAmount calcula el importe según horas y tarifa por hora.
func CalculateAmount(hours, hourlyRate float64) float64 {
	return hours * hourlyRate
}

// GroupHoursByDate suma las horas de los registros según su fecha de inicio.
func GroupHoursByDate(entries []models.TimeEntry) map[string]float64 {
	hoursByDate := make(map[string]float64)

	for _, entry := range entries {
		date := entry.StartTime.Format("2006-01-02")
		hoursByDate[date] += SecondsToHours(entry.Duration)
	}

	return hoursByDate
}
