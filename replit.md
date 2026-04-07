# Survive The Shift

A mobile game app where players practice de-escalating difficult customer interactions. Built as an Expo React Native app with an Express API backend.

## Project Structure

This is a pnpm monorepo with three artifact packages and shared libraries:

### Artifacts
- `artifacts/survive-the-shift/` — Expo mobile app (React Native), served at `/`
- `artifacts/api-server/` — Express API server, served at `/api`
- `artifacts/mockup-sandbox/` — Canvas design sandbox (not for production)

### Shared Libraries
- `lib/db/` — PostgreSQL database client using Drizzle ORM
- `lib/api-spec/` — OpenAPI specification and Orval codegen config
- `lib/api-zod/` — Generated Zod validation schemas from OpenAPI
- `lib/api-client-react/` — Generated React Query hooks from OpenAPI

### Scripts
- `scripts/` — Utility scripts

## Architecture

- **Frontend**: Expo / React Native (with Expo Router), runs on port 22022
- **Backend**: Express.js with TypeScript, runs on port 8080, exposed at `/api`
- **Database**: PostgreSQL via Replit's built-in database, accessed via Drizzle ORM
- **Auth**: Replit OIDC (openid-client) with session cookies stored in DB
- **API contract**: OpenAPI-first — spec in `lib/api-spec/openapi.yaml`, codegen via Orval

## Workflows

- **Start application** — `PORT=22022 pnpm --filter @workspace/survive-the-shift run dev`
- **Start Backend** — `PORT=8080 pnpm --filter @workspace/api-server run dev`

## Key Conventions

- Never use `console.log` in server code — use `req.log` in routes or `logger` singleton
- API routes all live under `/api` prefix
- Use Drizzle schema from `lib/db/src/schema/` for DB changes, push with `pnpm --filter @workspace/db run push`
- Run codegen with `pnpm --filter @workspace/api-spec run codegen` after OpenAPI changes
- All catalog dependencies defined in `pnpm-workspace.yaml`

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (auto-set by Replit DB)
- `PORT` — Service port (set per workflow invocation)
- `REPL_ID`, `REPLIT_DEV_DOMAIN`, `REPLIT_EXPO_DEV_DOMAIN` — Replit environment vars

## Database

Replit PostgreSQL is provisioned. Schema includes auth sessions and game shift records.
Push schema changes: `pnpm --filter @workspace/db run push`
