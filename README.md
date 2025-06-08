# Strato Cloud Assignment

This project is a full-stack web application featuring:
- **React + Vite** frontend
- **Go (Golang)** REST API backend
- **PostgreSQL** database

All services are containerized using Docker and orchestrated with Docker Compose.

---

## Project Structure

```
.
├── go-server/         # Go backend API
│   ├── cmd/app/       # Main entrypoint
│   ├── internal/      # API, config, and DB logic
│   ├── schemas/       # SQL schema and seed data
│   ├── Dockerfile
│   └── .env
├── react-app/         # React frontend (Vite)
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml # Multi-service orchestration
└── README.md
```

---

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Setup & Usage

### 1. Clone the repository

```sh
git clone --depth=1 https://github.com/pranavrd/strato-cloud-assingment.git
cd strato-cloud-assingment
```

### 2. Build and start all services

```sh
docker-compose up --build
```

This will:
- Start the PostgreSQL database and initialize it with schema/data from `go-server/schemas/init_table.sql`
- Build and run the Go API server on port **8081**
- Build and run the React app on port **5173**

### 3. Access the application

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:8081/api/users](http://localhost:8081/api/users)
- **Database:** Accessible at `localhost:5432`

### 4. Stopping the application

```sh
docker-compose down
```

To remove all data (including the database volume):

```sh
docker-compose down -v
```

---

## Development Notes

- **React hot reload:** The frontend runs in development mode with hot reload on port 5173.
- **Go API:** The backend listens on port 8081 and connects to the database using the `DATABASE_URL` environment variable.
- **Database initialization:** The database is seeded with sample data from `go-server/schemas/init_table.sql` on first run.

---

## API Endpoints

- `GET /api/users` — Returns all users
- `GET /api/users?active=yes` — Returns users with MFA enabled
- `GET /api/users?active=no` — Returns users with MFA disabled

---

## Troubleshooting

- If you change the schema or seed data, run `docker-compose down -v` to reset the database.
- If the Go server or React app is not reachable, check their logs:
  ```sh
  docker-compose logs go-server
  docker-compose logs react-app
  ```
- If you run into errors, please double check if the ports are already busy. You can do so by running :
    ```sh
    netstat -nlp | grep :portno
    ```
    or :
    ```sh
     nmap -st -O localhost
    ```

---

## License
