[![en](https://img.shields.io/badge/lang-en-red.svg)](README.en.md)

# BranersCarners

This is a modern monorepo project using **TurboRepo** for package and application management. The project integrates a **Next.js 16** frontend with internationalization, an **Express** API with **TypeORM**, and infrastructure via **Docker**.

## 🚀 Technologies

- **Monorepo:** [TurboRepo](https://turbo.build/)
- **Frontend:** [Next.js 16](https://nextjs.org/), [next-intl](https://next-intl-docs.vercel.app/), [SASS](https://sass-lang.com/)
- **Backend:** [Express](https://expressjs.com/), [TypeORM](https://typeorm.io/), [PostgreSQL](https://www.postgresql.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Code Quality:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), [Commitlint](https://commitlint.js.org/)
- **Infrastructure:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## 📂 Project Structure

- **apps/**
  - `web`: Frontend Application (Next.js 16).
  - `api`: Backend API (Express + TypeORM).
- **packages/**
  - `ui`: Shared UI components library.
  - `eslint-config`: Shared ESLint configurations.
  - `typescript-config`: Shared TypeScript configurations.

## 🛠️ Pré-requisitos

- **Node.js**: Version 18 or higher.
- **PNPM**: Version 9+ (Required package manager).
- **Docker**: To run the database and services.
- **Windows (Opcional)**: Enable "Developer Mode" in Windows settings to allow the creation of symbolic links during the build.

## ⚙️ Initial Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```
2. **Set up Environment Variables:**

   This project uses two .env files to avoid network conflicts between Docker and Localhost.
   - At the Root (`/.env`): Used by Docker Compose.
     ```bash
     POSTGRES_USER=admin
     POSTGRES_PASSWORD=password
     POSTGRES_DB=braners_carners_db
     POSTGRES_HOST=postgres       # Service name in Docker
     POSTGRES_PORT=5432           # Internal container port
     ```
   - In the API (`apps/api/.env`): Used for local development (Migrations/Run Dev).
     ```bash
     POSTGRES_USER=admin
     POSTGRES_PASSWORD=password
     POSTGRES_DB=braners_carners_db
     POSTGRES_HOST=localhost      # Accessible from your machine
     POSTGRES_PORT=5434           # Port exposed in Docker Compose
     ```
   - In the Web (`apps/web/.env.local`): Used for communication with the API.
     ```bash
     NEXT_PUBLIC_API_URL=http://localhost:3001
     ```

# 🏃‍♂️ How to Run the Project

## Option 1: Local Development

In this mode, you run the database in Docker and the applications (Web/API) on your machine to get fast hot-reload.

1. **Start only the Database:**
   ```bash
   docker-compose up -d postgres
   ```
2. **Run the Migrations (Create tables):**
   ```bash
   pnpm --filter api migration:run
   ```
3. **Start the applications:**
   ```bash
   pnpm run dev
   ```

   - **Web:** http://localhost:3000
   - **API:** http://localhost:3001
   - **Database:** localhost:5434

## Option 2: Full Infrastructure (Docker)

To simulate the production environment running everything in containers.

```bash
docker-compose up --build
```

# 📦 Useful Scripts

- `pnpm run dev` - Starts all applications in development mode.
- `pnpm run build` - Builds all applications and packages.
- `pnpm run lint` - Runs code linting (ESLint) across the entire monorepo.
- `pnpm run format` - Formats all code with Prettier.
- `pnpm run check-types` - Checks TypeScript errors without compiling.
- `pnpm --filter api migration:generate` - Generates a new migration based on entity changes.
- `pnpm --filter api migration:run` - Runs pending migrations in the database.
- `pnpm --filter api migration:revert` - Reverts the last migration.
- `pnpm --filter api migration:reset` - Reverts all migrations.

# ❗ Common Troubleshooting

1. **Error:** `EPERM: operation not permitted, symlink` (Windows)
   - **Description:** Occurs during the Next.js build.
   - **Solution:** Enable Developer Mode in Windows (Settings > System > For Developers) or run the terminal as Administrator.

2. **Error:** `getaddrinfo ENOTFOUND postgres`
   - **Description:** Occurs when running the API or migrations locally.
   - **Solution:** Check if you created the `apps/api/.env` file with `POSTGRES_HOST=localhost`. The `postgres` host only works inside Docker.

3. **Error:** EADDRINUSE :::3000
   - **Description:** The port is already in use.
   - **Solution:** Check if there are old containers running (`docker-compose down`) or other open Node processes.

# 🤝 Contribution

1. Ensure the code is formatted: `pnpm run format`

2. Check for lint errors: `pnpm run lint`

3. Commits must follow the Conventional Commits pattern **(e.g., feat: add new button, fix: database connection)**. Husky will validate your message before committing.
