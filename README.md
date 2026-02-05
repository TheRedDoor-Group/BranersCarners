[![en](https://img.shields.io/badge/lang-en-red.svg)](README.en.md)

# Braners Carners

Este é um projeto monorepo gerenciado com [Turborepo](https://turbo.build/repo) e [pnpm](https://pnpm.io).

## Estrutura do Projeto

- **apps/web**: Aplicação Frontend (Next.js 16 + next-intl).
- **apps/api**: Aplicação Backend (Express + TypeORM + PostgreSQL).
- **packages/ui**: Biblioteca de componentes de UI compartilhada.
- **packages/eslint-config**: Configurações de linting compartilhadas.
- **packages/typescript-config**: Configurações de TypeScript compartilhadas.

## Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v20 ou superior recomendado)
- [pnpm](https://pnpm.io/) (Gerenciador de pacotes)
- [Docker](https://www.docker.com/) & Docker Compose (Para o banco de dados)

## Passo a Passo para Iniciar

### 1. Clonar e Instalar Dependências

Na raiz do projeto, execute:

```bash
# Instalar todas as dependências do monorepo
pnpm install
```

### 2. Configurar Variáveis de Ambiente

#### Backend (API)

Crie um arquivo .env dentro da pasta apps/api/. Você pode usar o exemplo abaixo (ajuste conforme seu docker-compose.yml se necessário):
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
Crie um arquivo .env.local dentro da pasta apps/web/ para configurar a comunicação com a API:
```bash
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Subir o Banco de Dados
Utilize o Docker Compose que está na raiz do projeto para subir o PostgreSQL:
```bash
docker-compose up -d
```

### 4. Rodar as Migrations
Com o banco de dados rodando, execute as migrações para criar as tabelas necessárias:
```bash
# Executa o script de migração definido no package.json da API
pnpm --filter api migration:run
```

### 5. Popular o Banco de Dados (Seed Inicial)
Como o banco inicia vazio, você precisa rodar o seed para criar as unidades iniciais. Com a API rodando (veja o próximo passo), faça uma requisição POST:
```bash
# Via cURL (ou use Postman/Insomnia)
curl -X POST http://localhost:3001/seed-units
```
Isso criará os dados de exemplo (Mooca, Vila Mariana, etc.) que aparecerão na home do site.

### 6. Rodar o Projeto
Para iniciar tanto o frontend quanto o backend em modo de desenvolvimento:
```bash
# Na raiz do projeto
pnpm dev
```
- Web: http://localhost:3000
- API: http://localhost:3001

## Comandos Úteis
- pnpm build: Compila todos os apps e pacotes.
- pnpm lint: Executa o linting em todos os apps e pacotes.
- pnpm --filter api <comando>: Executa um comando apenas no escopo da API.
- pnpm --filter web <comando>: Executa um comando apenas no escopo da Web.

