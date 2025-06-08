package server

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (h *Handler) NewRouter() http.Handler {
	r := mux.NewRouter()
	r.HandleFunc("/api/users", h.GetActiveUsers).Methods("GET").Queries("active", "{active:yes|true}")
	r.HandleFunc("/api/users", h.GetAllUsers).Methods("GET")
	return r
}