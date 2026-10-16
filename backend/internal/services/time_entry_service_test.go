package services

import (
	"testing"
	"time"
)

func TestCalculateDuration_ValidIntervals(t *testing.T) {
	// Arrange: datos y resultados esperados.
	start := time.Date(2026, 10, 8, 10, 0, 0, 0, time.UTC)

	cases := []struct {
		name     string
		end      time.Time
		expected int64
	}{
		{
			name:     "una hora y media",
			end:      start.Add(90 * time.Minute),
			expected: 5400,
		},
		{
			name:     "inicio y fin iguales",
			end:      start,
			expected: 0,
		},
		{
			name:     "intervalo que cruza de dia",
			end:      start.Add(25 * time.Hour),
			expected: 90000,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			// Act: ejecutar la función.
			got, err := CalculateDuration(start, tc.end)

			// Assert: comprobar error y duración.
			if err != nil {
				t.Fatalf("no esperaba un error: %v", err)
			}

			if got != tc.expected {
				t.Errorf("duración = %d; esperaba %d", got, tc.expected)
			}
		})
	}
}

func TestCalculateDuration_RejectsEndBeforeStart(t *testing.T) {
	// Arrange
	start := time.Date(2026, 10, 8, 10, 0, 0, 0, time.UTC)
	end := start.Add(-time.Minute)

	// Act
	_, err := CalculateDuration(start, end)

	// Assert
	if err == nil {
		t.Fatal("esperaba un error por final anterior al inicio")
	}
}

func TestCalculateDuration_RejectsMissingDates(t *testing.T) {
	// Arrange
	valid := time.Date(2026, 10, 8, 10, 0, 0, 0, time.UTC)

	cases := []struct {
		name  string
		start time.Time
		end   time.Time
	}{
		{"sin inicio", time.Time{}, valid},
		{"sin fin", valid, time.Time{}},
		{"sin ambas fechas", time.Time{}, time.Time{}},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			// Act
			_, err := CalculateDuration(tc.start, tc.end)

			// Assert
			if err == nil {
				t.Fatal("esperaba un error por fechas faltantes")
			}
		})
	}
}
