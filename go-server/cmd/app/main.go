package main

import (
	"fmt"
	"log"
	"go-server/internal/config"
	"go-server/internal/api/server"
)

func main() {
	config, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Could not load server config: %v", err)
	}

	fmt.Printf("Starting server on port %s\n", config.ServerPort)
	
	apiServer := server.ApiServerHandler(config)
	if err := apiServer.Start(); err != nil {
		log.Fatalf("Server startup failed: %v", err)
	}
}