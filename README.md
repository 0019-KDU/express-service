# Express Service

Express.js backend starter template for learning Backstage Scaffolder.

> **Purpose:** This is a study template designed to demonstrate how to create software templates for [Backstage](https://backstage.io/) scaffolder. Use this as a reference for building your own scaffolder templates.

## Template Features

- **TypeScript** - Type-safe development
- **Express.js** - Fast, unopinionated web framework
- **Prisma ORM** - Modern database toolkit for PostgreSQL
- **Zod** - Schema validation
- **Winston** - Structured logging
- **Jest + Supertest** - Testing framework
- **Docker** - Containerization support
- **Security** - Helmet, CORS, rate limiting, hpp

## Project Structure

```
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Express middlewares
│   ├── routes/          # Route definitions
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── validators/      # Zod schemas
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── tests/
│   ├── unit/            # Unit tests
│   └── integration/     # Integration tests
├── prisma/
│   └── schema.prisma    # Database schema
└── docker-compose.yml   # Docker configuration
```

## Prerequisites

- Node.js >= 20.x
- PostgreSQL 16+
- npm or yarn

## Getting Started

### 1. Clone and Install

```bash
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/express_service?schema=public"
```

### 3. Database Setup

Start PostgreSQL (with Docker):

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Run migrations:

```bash
npm run db:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

The server will be available at `http://localhost:3000`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run tests with coverage |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:push` | Push schema changes |
| `npm run db:studio` | Open Prisma Studio |

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Full health status |
| GET | `/health/ready` | Readiness probe |
| GET | `/health/live` | Liveness probe |

### Users API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users` | List users (paginated) |
| GET | `/api/v1/users/:id` | Get user by ID |
| POST | `/api/v1/users` | Create user |
| PUT | `/api/v1/users/:id` | Update user |
| PATCH | `/api/v1/users/:id` | Partial update user |
| DELETE | `/api/v1/users/:id` | Delete user |

### Example Requests

**Create User:**
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "name": "John Doe", "password": "password123"}'
```

**List Users:**
```bash
curl "http://localhost:3000/api/v1/users?page=1&limit=10&search=john"
```

## API Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["Invalid email address"]
  }
}
```

## Docker

### Build and Run

```bash
# Build image
docker build -t express-service .

# Run with Docker Compose
docker-compose up -d
```

### Production Deployment

```bash
docker-compose -f docker-compose.yml up -d
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- tests/unit/user.service.test.ts
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `API_VERSION` | API version prefix | `v1` |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `LOG_LEVEL` | Logging level | `info` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `CORS_ORIGIN` | CORS allowed origins | `*` |

## Security Features

- **Helmet** - Secure HTTP headers
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Request throttling
- **HPP** - HTTP Parameter Pollution protection
- **Input Validation** - Zod schema validation
- **Environment Validation** - Startup config validation

## Backstage Scaffolder

This template is designed for use with Backstage Software Templates.

### Template Structure

```
├── catalog-info.yaml    # Backstage catalog entity definition
├── template.yaml        # Scaffolder template definition (create separately)
└── skeleton/            # Template skeleton files (this repo content)
```

### Using as Scaffolder Template

1. Create a `template.yaml` in your Backstage templates repository
2. Reference this repository as the skeleton source
3. Define input parameters for customization
4. Register the template in Backstage

### CI/CD Pipeline

The GitHub Actions workflow is configured for **manual trigger only** (`workflow_dispatch`). This prevents automatic pipeline runs when using this as a template.

To run the pipeline manually:
1. Go to **Actions** tab in GitHub
2. Select **CI/CD Pipeline**
3. Click **Run workflow**

## License

MIT
