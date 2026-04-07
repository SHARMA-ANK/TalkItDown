import { useCallback, useEffect, useRef } from "react";
import { Platform } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_DOMAIN
  ? `https://${process.env.EXPO_PUBLIC_DOMAIN}`
  : "";

const AMBIENT_VOLUME = 0.15;
const KAREN_VOLUME = 0.95;

type AudioScene = "grocery" | "drive-thru" | "store" | "coffee" | "office";

interface UseGameAudioOptions {
  scene: AudioScene;
  enabled: boolean;
  onKarenFinished?: () => void;
}

type HistoryEntry = { role: "user" | "karen"; text: string };

interface RespondOptions {
  userText: string;
  customerName: string;
  customerTitle: string;
  complaint: string;
  location: string;
  history: HistoryEntry[];
  rage: number;
  silenceCount?: number;
}

interface RespondResult {
  text: string;
  rageDelta: number;
  gameOver: string;
}

export function useGameAudio({ scene, enabled, onKarenFinished }: UseGameAudioOptions) {
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const karenRef = useRef<HTMLAudioElement | null>(null);
  const isMountedRef = useRef(true);
  const onKarenFinishedRef = useRef(onKarenFinished);
  onKarenFinishedRef.current = onKarenFinished;

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const startAmbient = useCallback(async () => {
    if (Platform.OS !== "web" || !enabled) return;
    try {
      const res = await fetch(`${BASE_URL}/api/voice/ambient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scene }),
      });
      if (!res.ok || !res.body) return;
      const blob = await res.blob();
      if (!isMountedRef.current) return;
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.volume = AMBIENT_VOLUME;
      audio.loop = true;
      audio.play().catch(() => {});
      ambientRef.current = audio;
    } catch {}
  }, [scene, enabled]);

  const stopAmbient = useCallback(() => {
    if (ambientRef.current) {
      ambientRef.current.pause();
      ambientRef.current = null;
    }
  }, []);

  // Stop Karen mid-sentence (user is interrupting)
  const stopKaren = useCallback(() => {
    if (karenRef.current) {
      karenRef.current.pause();
      karenRef.current.src = "";
      karenRef.current = null;
    }
    // Restore ambient volume
    if (ambientRef.current) ambientRef.current.volume = AMBIENT_VOLUME;
  }, []);

  // Fetch AI response + play audio. Returns text/delta immediately when audio STARTS.
  // onKarenFinished fires when audio ends naturally (not interrupted).
  const speakKarenRespond = useCallback(
    async (opts: RespondOptions): Promise<RespondResult> => {
      const duck = ambientRef.current;
      if (duck) duck.volume = 0.04;

      const defaultResult: RespondResult = {
        text: "Hello? Are you still there?!",
        rageDelta: opts.silenceCount ? 12 : 5,
        gameOver: "",
      };

      try {
        const res = await fetch(`${BASE_URL}/api/voice/respond`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userText: opts.userText,
            customerName: opts.customerName,
            customerTitle: opts.customerTitle,
            complaint: opts.complaint,
            location: opts.location,
            history: opts.history,
            rage: opts.rage,
            silenceCount: opts.silenceCount ?? 0,
          }),
        });

        if (!res.ok) {
          if (duck) duck.volume = AMBIENT_VOLUME;
          return defaultResult;
        }

        const karenTextRaw = res.headers.get("X-Karen-Text") || "";
        const rageDeltaRaw = res.headers.get("X-Rage-Delta") || "5";
        const gameOver = res.headers.get("X-Game-Over") || "";

        let text = defaultResult.text;
        try {
          text = atob(karenTextRaw) || defaultResult.text;
        } catch {
          text = karenTextRaw || defaultResult.text;
        }

        const rageDelta = Number(rageDeltaRaw) || defaultResult.rageDelta;
        const result: RespondResult = { text, rageDelta, gameOver };

        if (enabled && Platform.OS === "web" && res.body) {
          const blob = await res.blob();
          if (!isMountedRef.current) {
            if (duck) duck.volume = AMBIENT_VOLUME;
            return result;
          }

          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audio.volume = KAREN_VOLUME;

          // Stop any previous Karen audio
          if (karenRef.current) {
            karenRef.current.pause();
            karenRef.current.src = "";
          }
          karenRef.current = audio;

          audio.onended = () => {
            URL.revokeObjectURL(url);
            if (duck) duck.volume = AMBIENT_VOLUME;
            if (karenRef.current === audio) karenRef.current = null;
            onKarenFinishedRef.current?.();
          };
          audio.onerror = () => {
            if (duck) duck.volume = AMBIENT_VOLUME;
            if (karenRef.current === audio) karenRef.current = null;
            onKarenFinishedRef.current?.();
          };

          audio.play().catch(() => {
            if (duck) duck.volume = AMBIENT_VOLUME;
            onKarenFinishedRef.current?.();
          });
        } else {
          if (duck) duck.volume = AMBIENT_VOLUME;
          // No audio — fire finished immediately
          setTimeout(() => onKarenFinishedRef.current?.(), 100);
        }

        // Return IMMEDIATELY after audio starts (not after it ends)
        return result;
      } catch (err) {
        if (duck) duck.volume = AMBIENT_VOLUME;
        return defaultResult;
      }
    },
    [enabled]
  );

  const stopAll = useCallback(() => {
    stopAmbient();
    stopKaren();
  }, [stopAmbient, stopKaren]);

  return { startAmbient, stopAmbient, stopKaren, speakKarenRespond, stopAll };
}
