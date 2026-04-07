# Global Leaderboard

## What & Why
Show a real-time global leaderboard powered by the Postgres DB, so players can compete on total survival score and fastest de-escalation times. Replaces the static mock data currently in the leaderboard screen.

## Done looks like
- `GET /api/leaderboard?mode=global` returns the top 10 players by `total_shifts_survived` from the `users` table, with username and score.
- `GET /api/leaderboard?mode=history&userId=` returns the authenticated user's personal shift history from the `shifts` table, ordered by date descending.
- The Leaderboard tab in the Expo app fetches live data using React Query; it shows a loading skeleton while fetching and an empty state when there are no entries.
- The "MY HISTORY" tab shows real past shifts — customer name, outcome (won/lost color-coded), score, and time — from the user's actual shift history in the DB.
- The Break Room home screen also shows the authenticated user's real `total_shifts_survived` score instead of the local AsyncStorage value.

## Out of scope
- Friends/social graph leaderboard (future work)
- Push notifications for rank changes
- Pagination beyond the top 10

## Tasks
1. **Leaderboard API routes** — Add `GET /api/leaderboard` with `mode` query param to the Express API, reading from the `users` and `shifts` Drizzle tables.

2. **OpenAPI codegen** — Add leaderboard endpoints to `lib/api-spec/openapi.yaml` and run codegen to generate typed React Query hooks.

3. **Leaderboard screen** — Replace static mock data in the Leaderboard tab with live `useQuery` calls, add loading skeleton rows, and wire the MY HISTORY tab to real shift data.

4. **Home screen score sync** — Update the Break Room home screen to display the server-side `total_shifts_survived` value for the authenticated user, falling back to local AsyncStorage for guests.

## Relevant files
- `artifacts/survive-the-shift/app/(tabs)/leaderboard.tsx`
- `artifacts/survive-the-shift/app/(tabs)/index.tsx`
- `artifacts/survive-the-shift/context/GameContext.tsx`
- `artifacts/api-server/src/app.ts`
- `lib/api-spec/openapi.yaml`
