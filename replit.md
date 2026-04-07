# Survive The Shift

A mobile game app built with Expo (React Native) and an Express backend. Players survive workplace shifts in scenario-based challenges.

## Architecture

### Monorepo (pnpm workspaces)

- `artifacts/survive-the-shift/` — Expo mobile app (React Native + Expo Router)
- `artifacts/api-server/` — Express API server (TypeScript + ESBuild)
- `artifacts/mockup-sandbox/` — Vite-based UI mockup sandbox (design only)
- `lib/db/` — Drizzle ORM schema and PostgreSQL client
- `lib/api-spec/` — OpenAPI spec + Orval codegen config
- `lib/api-client-react/` — Generated React Query hooks
- `lib/api-zod/` — Generated Zod validators
- `scripts/` — Utility scripts

### Ports

- **Expo (frontend):** port 5000 (serves `/`)
- **API Server (backend):** port 8080 (serves `/api`)
- **Mockup Sandbox:** port 8081 (serves `/__mockup`)

All traffic is routed through the shared reverse proxy at `localhost:80`.

## Services

### Expo Mobile App
- Dev command: `pnpm --filter @workspace/survive-the-shift run dev`
- Uses `PORT=5000`, listens on `0.0.0.0`

### API Server
- Dev command: `pnpm --filter @workspace/api-server run dev`
- Builds with ESBuild, serves on port 8080
- Express with Pino logging, cookie-based auth via OpenID Connect

## Database

- PostgreSQL (Replit managed)
- Drizzle ORM with schema in `lib/db/src/schema/`
- Tables: `users`, `sessions`, `shifts`
- Migrations: `pnpm --filter @workspace/db run push`

## Authentication

- OpenID Connect via `openid-client`
- Session stored in PostgreSQL `sessions` table
- Auth routes in `artifacts/api-server/src/routes/auth.ts`

## Key Dependencies

- Expo 54, React Native 0.81
- Express 5, Drizzle ORM, PostgreSQL
- Zod validation, React Query for data fetching
- Orval for API codegen from OpenAPI spec

## Environment Variables / Secrets

- `DATABASE_URL` — PostgreSQL connection string
- `SESSION_SECRET` — Session signing secret
- `REPLIT_DEV_DOMAIN`, `REPLIT_EXPO_DEV_DOMAIN`, `REPL_ID` — Replit runtime vars
