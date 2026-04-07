import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_DOMAIN
  ? `https://${process.env.EXPO_PUBLIC_DOMAIN}`
  : "";

const AMBIENT_VOLUME = 0.2;
const KAREN_VOLUME = 0.9;

type AudioScene = "grocery" | "drive-thru" | "store" | "coffee" | "office";

interface UseGameAudioOptions {
  scene: AudioScene;
  enabled: boolean;
}

export function useGameAudio({ scene, enabled }: UseGameAudioOptions) {
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const karenRef = useRef<HTMLAudioElement | null>(null);
  const [karenLoading, setKarenLoading] = useState(false);
  const isMountedRef = useRef(true);

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
    } catch {
    }
  }, [scene, enabled]);

  const stopAmbient = useCallback(() => {
    if (ambientRef.current) {
      ambientRef.current.pause();
      ambientRef.current = null;
    }
  }, []);

  const speakKaren = useCallback(
    async (text: string, voice: "karen" | "manager" = "karen") => {
      if (Platform.OS !== "web" || !enabled) return;
      setKarenLoading(true);

      try {
        const duck = ambientRef.current;
        if (duck) duck.volume = 0.05;

        const res = await fetch(`${BASE_URL}/api/voice/tts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, voice }),
        });

        if (!res.ok || !res.body) {
          if (duck) duck.volume = AMBIENT_VOLUME;
          return;
        }

        const blob = await res.blob();
        if (!isMountedRef.current) {
          if (duck) duck.volume = AMBIENT_VOLUME;
          return;
        }

        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.volume = KAREN_VOLUME;

        karenRef.current?.pause();
        karenRef.current = audio;

        audio.onended = () => {
          URL.revokeObjectURL(url);
          if (duck) duck.volume = AMBIENT_VOLUME;
        };

        audio.play().catch(() => {
          if (duck) duck.volume = AMBIENT_VOLUME;
        });
      } catch {
        if (ambientRef.current) ambientRef.current.volume = AMBIENT_VOLUME;
      } finally {
        if (isMountedRef.current) setKarenLoading(false);
      }
    },
    [enabled],
  );

  const stopAll = useCallback(() => {
    stopAmbient();
    karenRef.current?.pause();
    karenRef.current = null;
  }, [stopAmbient]);

  return { startAmbient, stopAmbient, speakKaren, stopAll, karenLoading };
}
