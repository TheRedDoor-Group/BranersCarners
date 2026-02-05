[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README.md)

# Braners Carners

This is a monorepo project managed with [Turborepo](https://turbo.build/repo) and [pnpm](https://pnpm.io).

## Project Structure

- **apps/web**: Frontend Application (Next.js 16 + next-intl).
- **apps/api**: Backend Application (Express + TypeORM + PostgreSQL).
- **packages/ui**: Shared UI Components Library.
- **packages/eslint-config**: Shared linting configurations.
- **packages/typescript-config**: Shared TypeScript configurations.

## Prerequisites

Make sure you have installed on your machine:

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [pnpm](https://pnpm.io/) (Package Manager)
- [Docker](https://www.docker.com/) & Docker Compose (For the database)

## Steps to Start

### 1. Clone and Install Dependencies

On the root, run:
```bash
# Install all dependencies of the monorepo
pnpm install
```

### 2. Set Environment Variables

#### Backend (API)

Create a .env file inside the apps/api/ folder. You can use the example below (adjust according to your docker-compose.yml if needed):
```bash
# apps/api/.env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=branerscarners
```

#### Frontend (Web)
Create a .env.local file inside the apps/web/ folder to configure communication with the API:
```bash
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Start the Database
Use the Docker Compose that is in the root to start the PostgreSQL database:
```bash
docker-compose up -d
```

### 4. Run the Migrations
With the database running, run the migrations to create the necessary tables:
```bash
# Run the migration script defined in the package.json of the API
pnpm --filter api migration:run
```

### 5. Run the Seed (Seed Inicial)
As the database starts empty, you need to run the seed to create the initial units. With the API running (see the next step), make a POST request:# Via cURL (or use Postman/Insomnia):
```bash
# apps/api/.env.local
curl -X POST http://localhost:3001/seed-units
```
This will create the example data (Mooca, Vila Mariana, etc.) that will appear on the home page.

### 6. Run the Project
To start both the frontend and backend in development mode:
```bash
# On the root
pnpm dev
```
- Web: http://localhost:3000
- API: http://localhost:3001

## Useful Commands
- pnpm build: Compiles all apps and packages.
- pnpm lint: Runs the linting in all apps and packages.
- pnpm --filter api <command>: Runs a command only in the API scope.
- pnpm --filter web <command>: Runs a command only in the Web scope.