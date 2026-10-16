package handlers

import (
	"time"
	"timetracker/internal/database"
	"timetracker/internal/models"
)

// Implementación usada por el handler para acceder a la base real.
type invoiceTimeEntryRepository struct{}

func (invoiceTimeEntryRepository) FindForInvoice(
	projectID, userID uint,
	start, end time.Time,
) ([]models.TimeEntry, error) {
	var entries []models.TimeEntry

	err := database.DB.Where(
		"project_id = ? AND user_id = ? AND start_time BETWEEN ? AND ?",
		projectID, userID, start, end,
	).Find(&entries).Error

	return entries, err
}
