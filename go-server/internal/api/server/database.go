package server

import (
	"database/sql"
	"time"

	_ "github.com/lib/pq"
)

type DB interface {
	FetchUsers() ([]User, error)
}

type Connection struct {
	db *sql.DB
}

type Handler struct {
	conn *Connection
}

type User struct {
	User        string    `json:"user" db:"human_user"`
	CreatedDate time.Time `json:"created_date"`
	PasswordChangeDate time.Time `json:"password_change_date"`
	LastLoginDate time.Time `json:"last_login"`
	MfaEnabled   bool      `json:"mfa_enabled"`
	DaysSincePasswordChange int `json:"days_since_password_change"`
    DaysSinceLastLogin      int `json:"days_since_last_login"`
}

func NewPostgresConn(dataSourceName string) (*sql.DB, error) {
	db, err := sql.Open("postgres", dataSourceName)
	if err != nil {
		return nil, err
	}
	return db, nil
}

func NewConnection(db *sql.DB) *Connection {
	return &Connection{db: db}
}

func NewHandler(conn *Connection) *Handler {
	return &Handler{conn: conn}
}

func (h *Handler) FetchUsers() ([]User, error) {
	rows, err := h.conn.db.Query("SELECT * from users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		if err := rows.Scan(&user.User, &user.CreatedDate, &user.PasswordChangeDate, &user.LastLoginDate, &user.MfaEnabled); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}