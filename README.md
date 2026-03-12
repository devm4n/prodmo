# Prodman API

A production-ready REST API with JWT authentication and role-based access control.

## 🌐 Live
- **API:** https://prodmo-backend.onrender.com
- **Frontend:** https://prodmo.vercel.app
- **Docs:** https://prodmo-backend.onrender.com/api/docs/

---

## 🛠️ Stack
| Layer | Technology |
|-------|-----------|
| Backend | Django + Django REST Framework |
| Auth | JWT via SimpleJWT |
| Database | PostgreSQL |
| Frontend | React + Vite + Axios |
| Docs | Swagger via drf-spectacular |
| Deployment | Docker + Render + Vercel |

---

## ⚡ Getting Started

**Prerequisites:** Docker, Docker Compose
```bash
git clone https://github.com/devm4n/prodman.git
cd prodman
cp .env.example .env
docker compose up --build
```

Visit `http://localhost:8000/api/docs/` for interactive API docs.

---

## 🔑 Environment Variables
```env
POSTGRES_DB=prodman
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
DB_HOST=db
DB_PORT=5432
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CSRF_TRUSTED_ORIGINS=http://localhost:8000
```

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/signup/` | Register new user |
| POST | `/api/v1/auth/signin/` | Login → returns JWT |
| POST | `/api/v1/auth/refresh/` | Refresh access token |
| POST | `/api/v1/auth/create-admin/` | Create admin (admin only) |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/notes/` | List your notes |
| POST | `/api/v1/notes/` | Create a note |
| GET | `/api/v1/notes/{id}/` | Get a note |
| PUT | `/api/v1/notes/{id}/` | Update a note |
| DELETE | `/api/v1/notes/{id}/` | Delete a note |
| GET | `/api/v1/admin/notes/` | All notes (admin only) |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/user/profile/` | Get your profile |

### Attach token to every protected request:
```
Authorization: Bearer <your_access_token>
```

---

## 🗄️ Database Schema
```
User
├── id
├── username
├── email
├── password (hashed)
├── role (user/admin)
└── is_staff / is_superuser

Note
├── id
├── owner → FK to User
├── title
├── content
├── is_public
├── created_at
└── updated_at
```

---

## 📈 Scalability

The project is designed to scale without major refactoring:

- **Stateless JWT** — no server-side sessions means multiple backend instances can run simultaneously behind a load balancer
- **Docker** — spin up additional containers instantly under high traffic
- **Modular Django apps** — `users` and `notes` are fully independent, new modules plug in without touching existing code
- **PostgreSQL** — production-grade database with support for read replicas and connection pooling
- **Future roadmap** — Redis caching for hot queries, Celery for background tasks, Nginx as load balancer, microservices split if scale demands it

---

## 🐳 Docker Commands
```bash
# Start everything
docker compose up --build

# Run migrations
docker compose exec backend uv run python manage.py migrate

# Create superuser
docker compose exec backend uv run python manage.py createsuperuser

# Stop everything
docker compose down
```

---

## 🖥️ Frontend

React + Vite frontend with full API integration.
```bash
cd frontend
npm install
npm run dev
```

**Features:**
- Register and login with JWT
- Protected dashboard — redirects unauthenticated users
- Full notes CRUD with live feedback
- Error and success messages on every action

**Frontend env:**
```env
VITE_API_URL=http://localhost:8000
```
