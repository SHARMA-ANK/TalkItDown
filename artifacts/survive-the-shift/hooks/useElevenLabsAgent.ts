import { Conversation } from "@11labs/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

function getApiBase(): string {
  if (process.env.EXPO_PUBLIC_DOMAIN) {
    return `https://${process.env.EXPO_PUBLIC_DOMAIN}`;
  }
  return "";
}

export type AgentStatus =
  | "idle"
  | "creating"
  | "connecting"
  | "connected"
  | "speaking"
  | "listening"
  | "disconnected"
  | "error";

export type AgentMessage = {
  source: "ai" | "user";
  message: string;
};

type UseElevenLabsAgentOptions = {
  scenarioId: string;
  customerName: string;
  customerTitle: string;
  complaint: string;
  location: string;
  dialogue: string[];
  threatLevel: number;
  onRageDelta: (delta: number) => void;
  onMessage?: (msg: AgentMessage) => void;
  onStatusChange?: (status: AgentStatus) => void;
};

export function useElevenLabsAgent({
  scenarioId,
  customerName,
  customerTitle,
  complaint,
  location,
  dialogue,
  threatLevel,
  onRageDelta,
  onMessage,
  onStatusChange,
}: UseElevenLabsAgentOptions) {
  const [status, setStatus] = useState<AgentStatus>("idle");
  const [lastMessage, setLastMessage] = useState<AgentMessage | null>(null);
  const [mode, setMode] = useState<"speaking" | "listening">("speaking");
  const conversationRef = useRef<Awaited<ReturnType<typeof Conversation.startSession>> | null>(null);
  const agentIdRef = useRef<string | null>(null);
  const onRageDeltaRef = useRef(onRageDelta);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onRageDeltaRef.current = onRageDelta;
  }, [onRageDelta]);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const updateStatus = useCallback(
    (s: AgentStatus) => {
      setStatus(s);
      onStatusChange?.(s);
    },
    [onStatusChange]
  );

  const startSession = useCallback(async () => {
    if (Platform.OS !== "web") {
      console.warn("ElevenLabs Conversational AI is only supported on web");
      return;
    }

    try {
      updateStatus("creating");

      const base = getApiBase();

      const createResp = await fetch(`${base}/api/elevenlabs/create-agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId,
          customerName,
          customerTitle,
          complaint,
          location,
          dialogue,
          threatLevel,
        }),
      });

      if (!createResp.ok) {
        throw new Error(`Failed to create agent: ${createResp.status}`);
      }

      const { agentId } = (await createResp.json()) as { agentId: string };
      agentIdRef.current = agentId;

      const tokenResp = await fetch(`${base}/api/elevenlabs/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId }),
      });

      if (!tokenResp.ok) {
        throw new Error(`Failed to get signed URL: ${tokenResp.status}`);
      }

      const { signedUrl } = (await tokenResp.json()) as { signedUrl: string };

      updateStatus("connecting");

      const conversation = await Conversation.startSession({
        signedUrl,
        clientTools: {
          updateRage: ({ delta }: { delta: number }) => {
            onRageDeltaRef.current(delta);
            return `Rage updated by ${delta}`;
          },
        },
        onConnect: () => {
          updateStatus("connected");
        },
        onDisconnect: () => {
          updateStatus("disconnected");
          conversationRef.current = null;
        },
        onError: (msg: string) => {
          console.error("ElevenLabs error:", msg);
          updateStatus("error");
        },
        onMessage: ({
          message,
          source,
        }: {
          message: string;
          source: "ai" | "user";
        }) => {
          const m: AgentMessage = { message, source };
          setLastMessage(m);
          onMessageRef.current?.(m);
        },
        onModeChange: ({ mode: m }: { mode: "speaking" | "listening" }) => {
          setMode(m);
          if (m === "speaking") updateStatus("speaking");
          else if (m === "listening") updateStatus("listening");
        },
      });

      conversationRef.current = conversation;
    } catch (err) {
      console.error("Failed to start ElevenLabs session:", err);
      updateStatus("error");
    }
  }, [
    scenarioId,
    customerName,
    customerTitle,
    complaint,
    location,
    dialogue,
    threatLevel,
    updateStatus,
  ]);

  const endSession = useCallback(async () => {
    if (conversationRef.current) {
      try {
        await conversationRef.current.endSession();
      } catch {
        // ignore
      }
      conversationRef.current = null;
    }
    updateStatus("idle");
  }, [updateStatus]);

  const getInputVolume = useCallback((): number => {
    return (conversationRef.current as any)?.getInputVolume?.() ?? 0;
  }, []);

  const getOutputVolume = useCallback((): number => {
    return (conversationRef.current as any)?.getOutputVolume?.() ?? 0;
  }, []);

  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        conversationRef.current.endSession().catch(() => {});
        conversationRef.current = null;
      }
    };
  }, []);

  return {
    status,
    mode,
    lastMessage,
    startSession,
    endSession,
    getInputVolume,
    getOutputVolume,
    isActive:
      status !== "idle" && status !== "disconnected" && status !== "error",
  };
}
