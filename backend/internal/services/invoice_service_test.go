package services

import (
	"testing"
	"time"
	"timetracker/internal/models"
)

func TestSecondsToHours_ConvertsWholeHours(t *testing.T) {
	// Arrange
	seconds := int64(7200)

	// Act
	got := SecondsToHours(seconds)

	// Assert
	if got != 2 {
		t.Errorf("horas = %v; esperaba 2", got)
	}
}

func TestSecondsToHours_PreservesFractionalHours(t *testing.T) {
	// Arrange
	seconds := int64(5400)

	// Act
	got := SecondsToHours(seconds)

	// Assert
	if got != 1.5 {
		t.Errorf("horas = %v; esperaba 1.5", got)
	}
}

func TestCalculateAmount_MultipliesHoursByRate(t *testing.T) {
	// Arrange
	hours := 1.5
	hourlyRate := 100.0

	// Act
	got := CalculateAmount(hours, hourlyRate)

	// Assert
	if got != 150 {
		t.Errorf("importe = %v; esperaba 150", got)
	}
}

func TestCalculateAmount_ZeroHoursProducesZero(t *testing.T) {
	// Arrange
	hours := 0.0
	hourlyRate := 100.0

	// Act
	got := CalculateAmount(hours, hourlyRate)

	// Assert
	if got != 0 {
		t.Errorf("importe = %v; esperaba 0", got)
	}
}

func TestGroupHoursByDate_SumsEntriesOnSameDay(t *testing.T) {
	// Arrange
	day := time.Date(2026, 10, 12, 9, 0, 0, 0, time.UTC)
	entries := []models.TimeEntry{
		{StartTime: day, Duration: 3600},
		{StartTime: day.Add(3 * time.Hour), Duration: 1800},
	}

	// Act
	got := GroupHoursByDate(entries)

	// Assert
	if len(got) != 1 {
		t.Fatalf("cantidad de fechas = %d; esperaba 1", len(got))
	}

	if got["2026-10-12"] != 1.5 {
		t.Errorf("horas del día = %v; esperaba 1.5", got["2026-10-12"])
	}
}

func TestGroupHoursByDate_KeepsDifferentDaysSeparate(t *testing.T) {
	// Arrange
	day := time.Date(2026, 10, 12, 9, 0, 0, 0, time.UTC)
	entries := []models.TimeEntry{
		{StartTime: day, Duration: 3600},
		{StartTime: day.AddDate(0, 0, 1), Duration: 7200},
	}

	// Act
	got := GroupHoursByDate(entries)

	// Assert
	if len(got) != 2 {
		t.Fatalf("cantidad de fechas = %d; esperaba 2", len(got))
	}

	if got["2026-10-12"] != 1 {
		t.Errorf("horas del lunes = %v; esperaba 1", got["2026-10-12"])
	}

	if got["2026-10-13"] != 2 {
		t.Errorf("horas del martes = %v; esperaba 2", got["2026-10-13"])
	}
}

func TestGroupHoursByDate_NoEntriesProducesEmptyResult(t *testing.T) {
	// Arrange
	entries := []models.TimeEntry{}

	// Act
	got := GroupHoursByDate(entries)

	// Assert
	if len(got) != 0 {
		t.Errorf("cantidad de fechas = %d; esperaba 0", len(got))
	}
}
