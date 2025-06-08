package server

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (h *Handler) NewRouter() http.Handler {
	r := mux.NewRouter()
	r.HandleFunc("/api/users", h.GetUsers).Methods("GET")
	return r
}