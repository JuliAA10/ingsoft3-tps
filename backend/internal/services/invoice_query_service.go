package services

import (
	"time"
	"timetracker/internal/models"
)

// TimeEntryRepository define qué necesita el servicio del repositorio.
type TimeEntryRepository interface {
	FindForInvoice(
		projectID, userID uint,
		start, end time.Time,
	) ([]models.TimeEntry, error)
}

// LoadInvoiceHours consulta los registros y agrupa sus horas por fecha.
func LoadInvoiceHours(
	repo TimeEntryRepository,
	projectID, userID uint,
	start, end time.Time,
) (map[string]float64, error) {
	entries, err := repo.FindForInvoice(projectID, userID, start, end)
	if err != nil {
		return nil, err
	}

	return GroupHoursByDate(entries), nil
}
