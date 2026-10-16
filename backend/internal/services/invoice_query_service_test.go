package services

import (
	"errors"
	"testing"
	"time"
	"timetracker/internal/models"
)

// Este doble registra las llamadas y devuelve una respuesta controlada.
type mockTimeEntryRepository struct {
	entries []models.TimeEntry
	err     error

	calls     int
	projectID uint
	userID    uint
	start     time.Time
	end       time.Time
}

func (m *mockTimeEntryRepository) FindForInvoice(
	projectID, userID uint,
	start, end time.Time,
) ([]models.TimeEntry, error) {
	m.calls++
	m.projectID = projectID
	m.userID = userID
	m.start = start
	m.end = end

	return m.entries, m.err
}

func TestLoadInvoiceHours_QueriesRepositoryAndGroupsResults(t *testing.T) {
	// Arrange
	start := time.Date(2026, 10, 12, 0, 0, 0, 0, time.UTC)
	end := start.AddDate(0, 0, 1)

	repo := &mockTimeEntryRepository{
		entries: []models.TimeEntry{
			{StartTime: start.Add(9 * time.Hour), Duration: 3600},
			{StartTime: start.Add(12 * time.Hour), Duration: 1800},
		},
	}

	// Act
	got, err := LoadInvoiceHours(repo, 7, 42, start, end)

	// Assert: resultado.
	if err != nil {
		t.Fatalf("no esperaba un error: %v", err)
	}

	if len(got) != 1 || got["2026-10-12"] != 1.5 {
		t.Errorf("agrupación = %v; esperaba una fecha con 1.5 horas", got)
	}

	// Assert: interacción con la dependencia.
	if repo.calls != 1 {
		t.Errorf("llamadas al repositorio = %d; esperaba 1", repo.calls)
	}

	if repo.projectID != 7 || repo.userID != 42 {
		t.Errorf(
			"filtros recibidos: proyecto=%d, usuario=%d; esperaba 7 y 42",
			repo.projectID,
			repo.userID,
		)
	}

	if !repo.start.Equal(start) || !repo.end.Equal(end) {
		t.Error("el repositorio recibió un período incorrecto")
	}
}

func TestLoadInvoiceHours_ReturnsRepositoryError(t *testing.T) {
	// Arrange
	expectedErr := errors.New("falló la consulta")
	repo := &mockTimeEntryRepository{err: expectedErr}
	start := time.Date(2026, 10, 12, 0, 0, 0, 0, time.UTC)
	end := start.AddDate(0, 0, 1)

	// Act
	got, err := LoadInvoiceHours(repo, 7, 42, start, end)

	// Assert
	if !errors.Is(err, expectedErr) {
		t.Fatalf("error = %v; esperaba %v", err, expectedErr)
	}

	if got != nil {
		t.Errorf("resultado = %v; esperaba nil ante un error", got)
	}

	if repo.calls != 1 {
		t.Errorf("llamadas al repositorio = %d; esperaba 1", repo.calls)
	}
}
