---
title: Database & Auth Setup
---
# Database & Auth Setup

## What & Why
Set up the Postgres database schema and Replit Auth so player progress, session history, and scores are persisted server-side and tied to real user accounts.

## Done looks like
- Replit Auth is wired into the Express API; unauthenticated API calls return 401.
- Two Postgres tables exist: `users` (id, replit_user_id, username, total_shifts_survived, created_at) and `shifts` (id, user_id, customer_name, starting_rage, ending_rage, duration_seconds, outcome, chat_transcript JSON, created_at).
- The Expo app's auth screen detects whether the user is logged in (via a `/api/auth/me` endpoint) and redirects to the main tabs if already authenticated.
- After completing a shift the game can POST to `/api/shifts` to persist the session, and the data appears in the DB.

## Out of scope
- OAuth with Google or GitHub (Replit Auth handles identity)
- Password reset or email verification
- Leaderboard UI (separate task)
- AI game engine integration (separate task)

## Tasks
1. **Drizzle schema** — Add `users` and `shifts` tables to the existing Drizzle schema in `lib/db/`, run `pnpm --filter @workspace/db run push` to apply.

2. **Auth middleware** — Wire Replit Auth into the Express API so `/api/auth/me` returns the current user and a `requireAuth` middleware protects game endpoints.

3. **User seeding** — On first authenticated request, upsert the user into the `users` table using their Replit identity.

4. **Shifts API route** — Add `POST /api/shifts` (create a shift record) and `GET /api/shifts?userId=` (fetch history) with the `requireAuth` middleware.

5. **Expo auth integration** — In the Expo app's auth screen, hit `/api/auth/me`; if the user is already logged in, skip the auth screen and go straight to the tabs. Wire the "Sign in with Replit" button to the actual Replit Auth flow via expo-web-browser.

## Relevant files
- `artifacts/survive-the-shift/app/auth.tsx`
- `artifacts/survive-the-shift/app/_layout.tsx`
- `artifacts/survive-the-shift/context/GameContext.tsx`
- `artifacts/api-server/src/app.ts`
- `artifacts/api-server/package.json`