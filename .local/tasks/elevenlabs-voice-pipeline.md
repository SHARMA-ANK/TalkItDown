# ElevenLabs Voice Pipeline

## What & Why
Integrate ElevenLabs Voice Design and TTS so each customer has a dynamically generated unique voice. Karen speaks out loud to the player, with voice intensity scaling dynamically to match the rage level.

## Done looks like
- When a game session starts, the backend calls the ElevenLabs Voice Design API using the scenario's voice description to create a temporary `voice_id`.
- The customer's opening line and each subsequent reply are passed to ElevenLabs TTS with the `voice_id`, and the generated audio is streamed/played in the Expo app.
- When rage is above 80%, punctuation is injected ("!!") to make ElevenLabs produce a louder, more aggressive delivery.
- An audio playback indicator (animated waveform or bars) in the game screen shows when Karen is speaking.
- After the session ends, the temporary voice_id is discarded (or noted for cleanup).

## Out of scope
- Microphone capture or speech-to-text (separate task)
- Changing the AI evaluation logic (OpenAI Game Engine task)
- Persistent voice profiles across sessions

## Tasks
1. **ElevenLabs API service** — Create a server-side service that wraps the Voice Design API (create voice from description) and the TTS API (text to speech using a voice_id). Store the `ELEVENLABS_API_KEY` as a Replit secret.

2. **Voice generation on game start** — In `POST /api/game/start`, after generating the scenario, call Voice Design to create a `voice_id` and include it in the response. Cache it for the session duration.

3. **TTS endpoint** — Add `POST /api/game/speak` which accepts `{ text, voice_id, rage }` and returns audio (base64 or a signed URL). Apply rage-based punctuation injection server-side.

4. **Expo audio playback** — In the game screen, after receiving the customer reply from the evaluate endpoint, call `/api/game/speak` and play the returned audio using `expo-av`. Show an animated waveform while audio is playing; disable the mic button during playback.

## Relevant files
- `artifacts/survive-the-shift/app/game.tsx`
- `artifacts/api-server/src/app.ts`
- `lib/api-spec/openapi.yaml`
