// cmd/main.go
package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
	"timetracker/internal/config"
	"timetracker/internal/database"
	"timetracker/internal/handlers"
	"timetracker/internal/middleware"

	"github.com/getsentry/sentry-go"
	sentrygin "github.com/getsentry/sentry-go/gin"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	// Load configuration
	config.LoadConfig()

	// Sentry se habilita únicamente cuando el entorno tiene un DSN.
	sentryEnabled := strings.TrimSpace(os.Getenv("SENTRY_DSN")) != ""

	if sentryEnabled {
		err := sentry.Init(sentry.ClientOptions{
			Dsn:              os.Getenv("SENTRY_DSN"),
			Environment:      os.Getenv("SENTRY_ENVIRONMENT"),
			EnableTracing:    true,
			TracesSampleRate: 1.0,
			SendDefaultPII:   false,
		})
		if err != nil {
			log.Fatalf("No se pudo inicializar Sentry: %v", err)
		}

		defer sentry.Flush(2 * time.Second)
	}

	// Initialize database
	db := database.InitDB()
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Failed to get database: %v", err)
	}
	defer sqlDB.Close()

	// Initialize router
	r := gin.Default()

	if sentryEnabled {
		r.Use(sentrygin.New(sentrygin.Options{
			Repanic: true,
		}))
	}

	allowedOrigins := []string{
		"http://localhost:3000",
		"http://localhost:5173",
	}

	if value := strings.TrimSpace(os.Getenv("ALLOWED_ORIGINS")); value != "" {
		allowedOrigins = nil

		for _, origin := range strings.Split(value, ",") {
			if origin = strings.TrimSpace(origin); origin != "" {
				allowedOrigins = append(allowedOrigins, origin)
			}
		}
	}

	// CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	healthHandler := func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
		defer cancel()

		if err := sqlDB.PingContext(ctx); err != nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{
				"status":   "error",
				"database": "unavailable",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status":   "ok",
			"database": "ok",
		})
	}

	r.GET("/health", healthHandler)
	r.HEAD("/health", healthHandler)

	// Routes
	api := r.Group("/api")
	{
		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/register", handlers.Register)
			auth.POST("/login", handlers.Login)
		}

		// Protected routes
		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware())
		{
			// Projects
			protected.GET("/projects", handlers.GetProjects)
			protected.GET("/projects/:id", handlers.GetProject)
			protected.POST("/projects", handlers.CreateProject)
			protected.PUT("/projects/:id", handlers.UpdateProject)
			protected.DELETE("/projects/:id", handlers.DeleteProject)

			// Time entries
			protected.GET("/time-entries", handlers.GetTimeEntries)
			protected.GET("/time-entries/:id", handlers.GetTimeEntry)
			protected.POST("/time-entries", handlers.CreateTimeEntry)
			protected.PUT("/time-entries/:id", handlers.UpdateTimeEntry)
			protected.DELETE("/time-entries/:id", handlers.DeleteTimeEntry)

			// Tasks
			protected.GET("/tasks", handlers.GetTasks)
			protected.GET("/tasks/:id", handlers.GetTask)
			protected.POST("/tasks", handlers.CreateTask)
			protected.PUT("/tasks/:id", handlers.UpdateTask)
			protected.DELETE("/tasks/:id", handlers.DeleteTask)

			// Analytics
			protected.GET("/analytics/daily", handlers.GetDailyAnalytics)
			protected.GET("/analytics/weekly", handlers.GetWeeklyAnalytics)
			protected.GET("/analytics/monthly", handlers.GetMonthlyAnalytics)

			// Invoices
			protected.POST("/invoices/generate", handlers.GenerateInvoice)
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server starting on port %s", port)
	r.Run(":" + port)

}
