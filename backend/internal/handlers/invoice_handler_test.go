package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestGenerateInvoice_RejectsInvalidStartDate(t *testing.T) {
	// Arrange: petición con JSON válido y fecha de inicio inválida.
	gin.SetMode(gin.TestMode)

	router := gin.New()
	router.POST("/invoices", GenerateInvoice)

	body := `{
		"projectId": 7,
		"startDate": "no-es-una-fecha",
		"endDate": "2026-10-14"
	}`

	request := httptest.NewRequest(
		http.MethodPost,
		"/invoices",
		strings.NewReader(body),
	)
	request.Header.Set("Content-Type", "application/json")

	response := httptest.NewRecorder()

	// Act: procesar la petición en memoria.
	router.ServeHTTP(response, request)

	// Assert: comprobar el estado y el motivo del rechazo.
	if response.Code != http.StatusBadRequest {
		t.Fatalf(
			"estado = %d; esperaba 400. Respuesta: %s",
			response.Code,
			response.Body.String(),
		)
	}

	var result struct {
		Error string `json:"error"`
	}

	if err := json.Unmarshal(response.Body.Bytes(), &result); err != nil {
		t.Fatalf("respuesta JSON inválida: %v", err)
	}

	if result.Error != "Invalid start date format" {
		t.Errorf(
			"error = %q; esperaba %q",
			result.Error,
			"Invalid start date format",
		)
	}
}
