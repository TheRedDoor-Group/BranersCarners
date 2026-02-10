[![en](https://img.shields.io/badge/lang-en-red.svg)](README.en.md)

# BranersCarners

Este é um projeto monorepo moderno utilizando **TurboRepo** para gerenciamento de pacotes e aplicações. O projeto integra um frontend em **Next.js 16** com internacionalização, uma API em **Express** com **TypeORM**, e infraestrutura via **Docker**.

## 🚀 Tecnologias

- **Monorepo:** [TurboRepo](https://turbo.build/)
- **Frontend:** [Next.js 16](https://nextjs.org/), [next-intl](https://next-intl-docs.vercel.app/), [SASS](https://sass-lang.com/)
- **Backend:** [Express](https://expressjs.com/), [TypeORM](https://typeorm.io/), [PostgreSQL](https://www.postgresql.org/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Qualidade de Código:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), [Commitlint](https://commitlint.js.org/)
- **Infraestrutura:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## 📂 Estrutura do Projeto

- **apps/**
  - `web`: Aplicação Frontend (Next.js 16).
  - `api`: API Backend (Express + TypeORM).
- **packages/**
  - `ui`: Biblioteca de componentes de UI compartilhados.
  - `eslint-config`: Configurações compartilhadas do ESLint.
  - `typescript-config`: Configurações compartilhadas do TypeScript.

## 🛠️ Pré-requisitos

- **Node.js**: Versão 18 ou superior.
- **PNPM**: Versão 9+ (Gerenciador de pacotes obrigatório).
- **Docker**: Para rodar o banco de dados e serviços.
- **Windows (Opcional)**: Ativar o "Modo de Desenvolvedor" nas configurações do Windows para permitir a criação de links simbólicos durante o build.

## ⚙️ Configuração Inicial

1. **Instale as dependências:**
   ```bash
   pnpm install
   ```
2. **Configure as Variáveis de Ambiente:**

   Este projeto utiliza dois arquivos .env para evitar conflitos de rede entre Docker e Localhost.
   - Na Raiz (`/.env`): Usado pelo Docker Compose.
     ```bash
     POSTGRES_USER=admin
     POSTGRES_PASSWORD=password
     POSTGRES_DB=braners_carners_db
     POSTGRES_HOST=postgres       # Nome do serviço no Docker
     POSTGRES_PORT=5432           # Porta interna do container
     ```
   - Na API (`apps/api/.env`): Usado para desenvolvimento local (Migrations/Run Dev).
     ```bash
     POSTGRES_USER=admin
     POSTGRES_PASSWORD=password
     POSTGRES_DB=braners_carners_db
     POSTGRES_HOST=localhost      # Acessível da sua máquina
     POSTGRES_PORT=5434           # Porta exposta no Docker Compose
     ```
   - Na Web (`apps/web/.env.local`): Usado para comunicação com a API.
     ```bash
     NEXT_PUBLIC_API_URL=http://localhost:3001
     ```

# 🏃‍♂️ Como Rodar o Projeto

## Opção 1: Desenvolvimento Local

Neste modo, você roda o banco de dados no Docker e as aplicações (Web/API) na sua máquina para ter hot-reload rápido.

1. **Suba apenas o Banco de Dados:**
   ```bash
   docker-compose up -d postgres
   ```
2. **Rode as Migrations (Criação das tabelas):**
   ```bash
   pnpm --filter api migration:run
   ```
3. **Inicie as aplicações:**
   ```bash
   pnpm run dev
   ```

   - **Web:** http://localhost:3000
   - **API:** http://localhost:3001
   - **Banco:** localhost:5434

## Opção 2: Infraestrutura Completa (Docker)

Para simular o ambiente de produção rodando tudo em containers.

```bash
docker-compose up --build
```

# 📦 Scripts Úteis

- `pnpm run dev` - Inicia todas as aplicações em modo de desenvolvimento.
- `pnpm run build` - Compila todas as aplicações e pacotes
- `pnpm run lint` - Executa verificação de código (ESLint) em todo o monorepo.
- `pnpm run format` - Formata todo o código com Prettier.
- `pnpm run check-types` - Verifica erros de TypeScript sem compilar.
- `pnpm --filter api migration:generate` - Gera uma nova migration baseada nas alterações das entidades.
- `pnpm --filter api migration:run` - Executa as migrations pendentes no banco de dados.
- `pnpm --filter api migration:revert` - Reverte a última migration.
- `pnpm --filter api migration:reset` - Reverte todas as migrations.

# ❗ Solução de Problemas Comuns

1. **Erro:** `EPERM: operation not permitted, symlink` (Windows)
   - **Descrição:** Ocorre durante o build do Next.js.
   - **Solução:** Ative o Modo de Desenvolvedor no Windows (Configurações > Sistema > Para desenvolvedores) ou execute o terminal como Administrador.

2. **Erro:** `getaddrinfo ENOTFOUND postgres`
   - **Descrição:** Ocorre ao rodar a API ou migrations localmente.
   - **Solução:** Verifique se criou o arquivo `apps/api/.env` com `POSTGRES_HOST=localhost`. O host `postgres` só funciona dentro do Docker.

3. **Erro:** EADDRINUSE :::3000
   - **Descrição:** A porta já está em uso.
   - **Solução:** Verifique se não há containers antigos rodando (`docker-compose down`) ou outros processos Node abertos.

# 🤝 Contribuição

1. Garanta que o código está formatado: `pnpm run format`

2. Verifique se não há erros de lint: `pnpm run lint`

3. Os commits devem seguir o padrão Conventional Commits **(ex: feat: add new button, fix: database connection)**. O Husky irá validar sua mensagem antes do commit.
