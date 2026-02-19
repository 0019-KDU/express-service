# Express Service

> Production-ready Express.js backend service scaffolded via Backstage and deployed using Terraform on AWS EC2.

---

## 📌 Overview

Express Service is a modular, scalable backend application built with:

- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **Docker**
- **Terraform (Infrastructure as Code)**

This service follows clean architecture principles and is designed for cloud deployment.

---

## 🏗 Architecture

### High-Level Architecture

Client
↓
AWS EC2
↓
Express.js Application
↓
PostgreSQL Database


### Components

| Layer | Technology |
|-------|------------|
| Runtime | Node.js 20 |
| Framework | Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Infrastructure | Terraform |
| CI/CD | GitHub Actions |
| Hosting | AWS EC2 |

---

## 📂 Project Structure

src/
├── config/ # Configuration management
├── controllers/ # Request handlers
├── middlewares/ # Express middlewares
├── routes/ # API routes
├── services/ # Business logic
├── utils/ # Helper utilities
├── validators/ # Zod schemas


---

## 🚀 Deployment

### Infrastructure

Provisioned using Terraform via the `my-service-infra` repository.

Resources:

- EC2 Instance
- Security Group
- IAM Role (if configured)
- Remote Terraform State (recommended: S3)

### CI/CD Flow

Push to main
↓
GitHub Actions
↓
Terraform Plan
↓
Terraform Apply
↓
EC2 Provisioned


---

## 🌐 API Overview

### Health Endpoints

| Endpoint | Description |
|----------|------------|
| `/health` | Full health check |
| `/health/ready` | Readiness probe |
| `/health/live` | Liveness probe |

---

### Users API

Base Path:

/api/v1/users


Supports:

- List users
- Create user
- Update user
- Delete user

---

## 🔐 Security Features

- Helmet (secure headers)
- Rate limiting
- CORS control
- Input validation (Zod)
- Environment validation
- HTTP Parameter Pollution protection

---

## ⚙️ Configuration

Environment Variables:

| Variable | Description |
|----------|------------|
| NODE_ENV | Environment mode |
| PORT | Application port |
| DATABASE_URL | PostgreSQL connection string |
| LOG_LEVEL | Logging level |

---

## 🧪 Testing Strategy

- Unit Tests (Services)
- Integration Tests (API)
- Jest + Supertest

Run:

npm test


---

## 📊 Observability

Recommended Production Additions:

- Structured logging (Winston)
- Log shipping to CloudWatch
- Metrics (Prometheus compatible)
- Health endpoints for monitoring

---

## 📦 Docker

Build image:

docker build -t express-service .


Run:

docker-compose up -d


---

## 🔄 Future Improvements

- RDS instead of local PostgreSQL
- Auto-scaling group
- Load balancer
- HTTPS via ACM
- Centralized logging
- OpenAPI documentation
- Swagger UI integration

---

## 👥 Ownership

| Role | Owner |
|------|-------|
| Service Owner | Platform Team |
| Infrastructure Owner | DevOps Team |

---

## 📝 Change Management

All infrastructure changes must:

1. Be committed to infra repo
2. Pass CI pipeline
3. Be reviewed via Pull Request

---

## 📚 Related Repositories

- `my-service` – Application code
- `my-service-infra` – Terraform infrastructure

---

## 📌 Backstage Metadata

This service is managed through Backstage Software Templates.

TechDocs are built using MkDocs and rendered via the Backstage TechDocs plugin.

---

## 📜 License

MIT
