# OpenAI Game Engine

## What & Why
Implement the real AI-powered game loop: the backend generates random customer scenarios and evaluates player responses using OpenAI, returning a rage delta and the customer's next line of dialogue. This replaces the current simulated/static game logic.

## Done looks like
- `POST /api/game/start` generates a unique customer scenario (name, backstory, opening complaint, starting rage 60%) using GPT-4o-mini and returns it as JSON.
- `POST /api/game/evaluate` accepts the player's transcribed text, the conversation history, and current rage level; GPT evaluates the response and returns `{ rage_change: number, customer_reply: string }`.
- The Expo game screen calls these endpoints instead of simulating outcomes locally.
- Win condition triggers when rage hits 0; loss triggers at 100. Both save the completed shift to the DB via `POST /api/shifts`.
- Each scenario includes a suggested ElevenLabs voice description string (for the future voice task) in the API response.

## Out of scope
- ElevenLabs voice synthesis (separate task)
- Microphone capture (separate task)
- Database schema creation (separate task — DB & Auth must be merged first)

## Tasks
1. **OpenAI backend service** — Create a game service module in the API server that calls GPT-4o-mini for scenario generation and response evaluation, using the system prompt from the spec.

2. **API routes** — Add `POST /api/game/start` and `POST /api/game/evaluate` routes, protected by `requireAuth` middleware.

3. **OpenAPI spec** — Add the two new endpoints to `lib/api-spec/openapi.yaml` and run codegen so the Expo app can use typed hooks.

4. **Expo game screen wiring** — Replace the simulated rage logic in `app/game.tsx` with real API calls: on screen mount call `/start`, on each player response call `/evaluate`, update rage meter with the returned delta, display `customer_reply` in the speech bubble.

5. **Win/loss save** — On game end, POST the completed shift to `/api/shifts` with outcome, duration, and the full chat transcript.

## Relevant files
- `artifacts/survive-the-shift/app/game.tsx`
- `artifacts/survive-the-shift/context/GameContext.tsx`
- `artifacts/api-server/src/app.ts`
- `lib/api-spec/openapi.yaml`
