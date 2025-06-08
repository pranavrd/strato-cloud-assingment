package server

import (
	"encoding/json"
	"net/http"
	"time"
	"log"
)

func (h *Handler) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.FetchUsers()
	log.Printf("Getting all users")
	if err != nil {
		http.Error(w, "Failed to retrieve users: "+err.Error(), http.StatusInternalServerError)
		log.Fatalf("Error fetching users: %v", err)
		return
	}
	users = addDaysSince(users)
	respondWithJSON(w, http.StatusOK, users)
}

func (h *Handler) GetActiveUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.FetchUsers()
	log.Printf("Getting active users")
	if err != nil {
		http.Error(w, "Failed to retrieve users: "+err.Error(), http.StatusInternalServerError)
		log.Fatalf("Error fetching users: %v", err)
		return
	}
	mfaUsers := make([]User, 0)
	for _, user := range users {
		if user.MfaEnabled {
			mfaUsers = append(mfaUsers, user)
		}
	}
	users = mfaUsers
	users = addDaysSince(users)
	if err != nil {
		http.Error(w, "Failed to retrieve active users", http.StatusInternalServerError)
		return
	}
	respondWithJSON(w, http.StatusOK, users)
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, err := json.Marshal(payload)
	if err != nil {
		http.Error(w, "Failed to marshal JSON", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func addDaysSince(users []User) []User {
	for i := range users {
		users[i].DaysSincePasswordChange = int(time.Since(users[i].PasswordChangeDate).Hours() / 24)
		users[i].DaysSinceLastLogin = int(time.Since(users[i].LastLoginDate).Hours() / 24)
	}
	return users
}