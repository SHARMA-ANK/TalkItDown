# Mic & Speech Recognition

## What & Why
Implement the hold-to-speak microphone interaction with live audio capture, transcription via the Web Speech API (web) or OpenAI Whisper (native), and an audio visualizer animation so the player can speak their responses instead of typing.

## Done looks like
- The big circular mic button in the game screen registers as a hold-to-speak control: press and hold to record, release to send.
- While holding, an audio waveform visualizer animation plays (animated bars react to audio amplitude on native, CSS animation on web).
- On release, the captured audio is transcribed; the transcribed text is displayed briefly in a status line ("You said: ...") before the evaluate call is made.
- On web: Web Speech API handles recognition in real time.
- On native (iOS/Android via Expo Go): use `expo-av` to record and send the audio to `POST /api/game/transcribe` (OpenAI Whisper endpoint) for transcription.
- The mic button is disabled while Karen is speaking (waiting for audio playback to finish).

## Out of scope
- ElevenLabs playback (separate ElevenLabs task)
- OpenAI evaluation of the transcribed text (OpenAI Game Engine task handles that)
- Push-to-talk UI on the Scenario or Auth screens

## Tasks
1. **Whisper transcription endpoint** — Add `POST /api/game/transcribe` to the API server that accepts a WAV/m4a audio file and returns the transcribed text using the OpenAI Whisper API.

2. **Native mic recording** — In the game screen, use `expo-av` Audio recording to capture audio while the button is held, then POST the file to `/api/game/transcribe` on release.

3. **Web Speech API path** — On `Platform.OS === 'web'`, use the browser's Web Speech API (`SpeechRecognition`) as a lightweight alternative to Whisper; no audio upload required.

4. **Audio visualizer** — While recording, animate 5-7 vertical bars reacting to mic amplitude (use `expo-av` metering on native; a CSS keyframe fallback on web).

5. **UI state machine** — Wire the full state sequence: idle → recording → processing → karen_speaking → idle, disabling the mic and displaying status text at each stage.

## Relevant files
- `artifacts/survive-the-shift/app/game.tsx`
- `artifacts/api-server/src/app.ts`
- `lib/api-spec/openapi.yaml`
