package server

import (
	"fmt"
	"log"
	"go-server/internal/config"
	"github.com/rs/cors"
	"net/http"
)

type ApiServer struct {
	httpServer *http.Server
}

func ApiServerHandler(config *config.Config) *ApiServer {
	conn, err := NewPostgresConn(config.DatabaseURL)
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}

	db := NewConnection(conn)
	handler := NewHandler(db)
	router := handler.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})
	handlerWithCORS := c.Handler(router)

	return &ApiServer{
		httpServer: &http.Server{
			Addr:    fmt.Sprintf(":%s", config.ServerPort),
			Handler: handlerWithCORS,
		},
	}
}

func (s *ApiServer) Start() error {
	log.Printf("Server is running on %s ", s.httpServer.Addr)
	return s.httpServer.ListenAndServe()
}
