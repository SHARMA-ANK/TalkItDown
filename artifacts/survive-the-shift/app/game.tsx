import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGame } from "@/context/GameContext";
import { useElevenLabsAgent, type AgentMessage, type AgentStatus } from "@/hooks/useElevenLabsAgent";
import colors from "@/constants/colors";

const GAME_DURATION = 120;
const MAX_RAGE = 100;
const RAGE_DRIFT_RATE = 0.12;

export default function GameScreen() {
  const insets = useSafeAreaInsets();
  const { currentScenario, recordResult, haptics } = useGame();
  const [rage, setRage] = useState(30);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [managerUsed, setManagerUsed] = useState(false);
  const [ragePeak, setRagePeak] = useState(30);
  const [ended, setEnded] = useState(false);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const [sessionStarted, setSessionStarted] = useState(false);

  const pulseAnim = useRef(new Animated.Value(0)).current;
  const micPulseAnim = useRef(new Animated.Value(1)).current;
  const ragePendingRef = useRef<number>(0);
  const endedRef = useRef(false);
  const timeLeftRef = useRef(GAME_DURATION);
  const ragePeakRef = useRef(30);
  const managerUsedRef = useRef(false);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const scenario = currentScenario;

  const handleRageDelta = useCallback((delta: number) => {
    ragePendingRef.current += delta;
  }, []);

  const handleMessage = useCallback((msg: AgentMessage) => {
    setMessages((prev) => [...prev.slice(-5), msg]);
  }, []);

  const agent = useElevenLabsAgent(
    scenario
      ? {
          scenarioId: scenario.id,
          customerName: scenario.customerName,
          customerTitle: scenario.customerTitle,
          complaint: scenario.complaint,
          location: scenario.location,
          dialogue: scenario.dialogue,
          threatLevel: scenario.threatLevel,
          onRageDelta: handleRageDelta,
          onMessage: handleMessage,
          onStatusChange: setAgentStatus,
        }
      : {
          scenarioId: "none",
          customerName: "Karen",
          customerTitle: "Customer",
          complaint: "Generic complaint",
          location: "Store",
          dialogue: ["Hello?"],
          threatLevel: 3,
          onRageDelta: handleRageDelta,
          onMessage: handleMessage,
          onStatusChange: setAgentStatus,
        }
  );

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (agentStatus === "listening") {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(micPulseAnim, { toValue: 1.2, duration: 450, useNativeDriver: true }),
          Animated.timing(micPulseAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
        ])
      );
      anim.start();
      return () => anim.stop();
    } else {
      Animated.timing(micPulseAnim, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    }
  }, [agentStatus, micPulseAnim]);

  const handleEnd = useCallback(
    (won: boolean) => {
      if (endedRef.current) return;
      endedRef.current = true;
      setEnded(true);
      agent.endSession();
      if (haptics) {
        if (won) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        else Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      const elapsed = GAME_DURATION - timeLeftRef.current;
      const bonus = won ? Math.max(0, 300 - elapsed * 2) : 0;
      const managerBonus = !managerUsedRef.current && won ? 100 : 0;
      const scoreEarned = won ? 200 + bonus + managerBonus : 0;
      recordResult({
        scenarioId: scenario?.id ?? "unknown",
        customerName: scenario?.customerName ?? "Unknown",
        location: scenario?.location ?? "Unknown",
        complaint: scenario?.complaint ?? "Unknown",
        timeSecs: elapsed,
        ragePeak: Math.round(ragePeakRef.current),
        managerUsed: managerUsedRef.current,
        scoreEarned,
        won,
        timestamp: Date.now(),
      });
      router.replace({ pathname: "/result", params: { won: won ? "1" : "0" } });
    },
    [scenario, haptics, recordResult, agent]
  );

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    ragePeakRef.current = ragePeak;
  }, [ragePeak]);

  useEffect(() => {
    managerUsedRef.current = managerUsed;
  }, [managerUsed]);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => {
      setRage((prev) => {
        const pending = ragePendingRef.current;
        ragePendingRef.current = 0;
        const next = Math.min(MAX_RAGE, Math.max(0, prev + pending + RAGE_DRIFT_RATE));
        setRagePeak((pk) => {
          const newPk = Math.max(pk, next);
          ragePeakRef.current = newPk;
          return newPk;
        });
        if (next >= MAX_RAGE && !endedRef.current) {
          setTimeout(() => handleEnd(false), 0);
        }
        return next;
      });
    }, 200);
    return () => clearInterval(t);
  }, [ended, handleEnd]);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        timeLeftRef.current = next;
        if (next <= 0 && !endedRef.current) {
          setTimeout(() => handleEnd(true), 0);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [ended, handleEnd]);

  const handleStartSession = async () => {
    if (sessionStarted) return;
    setSessionStarted(true);
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await agent.startSession();
  };

  const handleManager = () => {
    if (managerUsed || ended) return;
    setManagerUsed(true);
    managerUsedRef.current = true;
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    ragePendingRef.current -= 25;
  };

  const rageColor =
    rage < 40 ? colors.green : rage < 70 ? colors.amber : colors.red;

  const rageLabel =
    rage < 40 ? "CALM" : rage < 70 ? "ESCALATING" : "CRITICAL";

  const isKarenSpeaking = agentStatus === "speaking";
  const isPlayerTurn = agentStatus === "listening";

  const latestKarenMsg = [...messages].reverse().find((m) => m.source === "ai");
  const latestPlayerMsg = [...messages].reverse().find((m) => m.source === "user");

  const mins = Math.floor(timeLeft / 60);
  const secs = String(timeLeft % 60).padStart(2, "0");

  const statusColor =
    agentStatus === "error"
      ? colors.red
      : agentStatus === "connecting" || agentStatus === "creating"
      ? colors.amber
      : agentStatus === "speaking" || agentStatus === "listening" || agentStatus === "connected"
      ? colors.green
      : colors.muted;

  const statusLabel: Record<AgentStatus, string> = {
    idle: "TAP BELOW TO START",
    creating: "SETTING UP SHIFT…",
    connecting: "CONNECTING…",
    connected: "CONNECTED",
    speaking: "KAREN IS SPEAKING",
    listening: "YOUR TURN — SPEAK NOW",
    disconnected: "DISCONNECTED",
    error: "CONNECTION ERROR",
  };

  if (!scenario) {
    router.replace("/(tabs)/");
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: topPad, paddingBottom: botPad }]}>
      {/* Header row */}
      <View style={styles.header}>
        <View style={styles.locationBadge}>
          <Text style={styles.locationText} numberOfLines={1}>
            📍 {scenario.location.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Timer + Rage + Manager row */}
      <View style={styles.statsRow}>
        <View style={styles.timerBox}>
          <Text style={styles.timerLabel}>TIME</Text>
          <Text style={styles.timerValue}>
            {mins}:{secs}
          </Text>
        </View>

        <View style={styles.rageBox}>
          <View style={styles.rageLabelRow}>
            <Text style={[styles.rageLabel, { color: rageColor }]}>{rageLabel}</Text>
            <Text style={[styles.ragePercent, { color: rageColor }]}>
              {Math.round(rage)}%
            </Text>
          </View>
          <View style={styles.rageBarBg}>
            <Animated.View
              style={[
                styles.rageBarFill,
                { width: `${rage}%` as any, backgroundColor: rageColor },
              ]}
            />
          </View>
          <View style={styles.rageTicks}>
            <Text style={styles.rageTick}>CALM</Text>
            <Text style={styles.rageTick}>FIRED</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.managerBtn, managerUsed && styles.managerBtnUsed]}
          onPress={handleManager}
          disabled={managerUsed || ended}
          activeOpacity={0.7}
        >
          <Text style={styles.managerIcon}>📋</Text>
          <Text style={[styles.managerLabel, managerUsed && styles.managerLabelUsed]}>
            {managerUsed ? "USED" : "MGR"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Karen card */}
      <View style={styles.karenPanel}>
        <View style={styles.karenAvatarRow}>
          <Animated.View
            style={[
              styles.karenAvatar,
              isKarenSpeaking && {
                transform: [
                  {
                    scale: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.06],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.karenAvatarIcon}>😤</Text>
          </Animated.View>
          <View style={styles.karenInfo}>
            <Text style={styles.karenName}>{scenario.customerName}</Text>
            <Text style={styles.karenTitle}>{scenario.customerTitle}</Text>
            <View style={[styles.statusPill, { borderColor: statusColor }]}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {statusLabel[agentStatus]}
              </Text>
            </View>
          </View>
        </View>

        {latestKarenMsg ? (
          <View style={styles.dialogueBubble}>
            <Text style={styles.dialogueLabel}>KAREN SAYS</Text>
            <Text style={styles.dialogueText}>"{latestKarenMsg.message}"</Text>
          </View>
        ) : (
          <View style={styles.dialogueBubble}>
            <Text style={styles.dialogueLabel}>SITUATION</Text>
            <Text style={styles.dialogueText}>"{scenario.complaint}"</Text>
          </View>
        )}
      </View>

      {/* Conversation feed */}
      <View style={styles.chatArea}>
        {messages.length === 0 ? (
          <Text style={styles.chatEmptyHint}>
            {sessionStarted
              ? "Conversation will appear here…"
              : "Start the shift to begin the conversation."}
          </Text>
        ) : (
          messages.slice(-4).map((msg, i) => (
            <View
              key={i}
              style={[
                styles.chatBubble,
                msg.source === "ai" ? styles.karenBubble : styles.playerBubble,
              ]}
            >
              <Text style={styles.chatSource}>
                {msg.source === "ai" ? "😤 KAREN" : "🎙️ YOU"}
              </Text>
              <Text style={styles.chatText}>{msg.message}</Text>
            </View>
          ))
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {!sessionStarted ? (
          <TouchableOpacity
            style={styles.startBtn}
            onPress={handleStartSession}
            disabled={!scenario}
            activeOpacity={0.85}
          >
            <Text style={styles.startBtnText}>🎙️  BEGIN SHIFT</Text>
            <Text style={styles.startBtnSub}>
              Your mic opens automatically — just speak naturally
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.micArea}>
            <Animated.View
              style={[
                styles.micIndicator,
                { transform: [{ scale: micPulseAnim }] },
                isPlayerTurn && styles.micIndicatorActive,
                isKarenSpeaking && styles.micIndicatorKaren,
              ]}
            >
              <Text style={styles.micIconEmoji}>
                {isPlayerTurn ? "🎙️" : isKarenSpeaking ? "🔊" : "⏳"}
              </Text>
            </Animated.View>
            <Text style={[styles.micHint, { color: isPlayerTurn ? colors.green : colors.muted }]}>
              {isPlayerTurn
                ? "Speak now — mic is open"
                : isKarenSpeaking
                ? "Karen is speaking…"
                : agentStatus === "creating" || agentStatus === "connecting"
                ? "Connecting…"
                : agentStatus === "error"
                ? "Connection error — try restarting"
                : "Waiting…"}
            </Text>

            {latestPlayerMsg && (
              <View style={styles.playerTranscript}>
                <Text style={styles.playerTranscriptLabel}>YOU SAID</Text>
                <Text style={styles.playerTranscriptText}>
                  "{latestPlayerMsg.message}"
                </Text>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity
          style={styles.quitBtn}
          onPress={() => handleEnd(false)}
          activeOpacity={0.7}
        >
          <Text style={styles.quitBtnText}>QUIT SHIFT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  locationBadge: {
    backgroundColor: colors.panelAlt,
    borderWidth: 1,
    borderColor: colors.panelBorder,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  locationText: {
    color: colors.muted,
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    letterSpacing: 1.5,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.panelBorder,
  },
  timerBox: {
    alignItems: "center",
    minWidth: 52,
  },
  timerLabel: {
    color: colors.muted,
    fontSize: 8,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  timerValue: {
    color: colors.text,
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  rageBox: {
    flex: 1,
    gap: 2,
  },
  rageLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rageLabel: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  ragePercent: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
  },
  rageBarBg: {
    height: 10,
    backgroundColor: colors.panelAlt,
    borderRadius: 5,
    overflow: "hidden",
  },
  rageBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  rageTicks: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rageTick: {
    color: colors.muted,
    fontSize: 7,
    fontFamily: "Inter_500Medium",
    letterSpacing: 1,
  },
  managerBtn: {
    alignItems: "center",
    backgroundColor: colors.panelAlt,
    borderWidth: 1.5,
    borderColor: colors.amber,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  managerBtnUsed: {
    borderColor: colors.panelBorder,
    opacity: 0.45,
  },
  managerIcon: {
    fontSize: 16,
  },
  managerLabel: {
    color: colors.amber,
    fontSize: 8,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
    marginTop: 1,
  },
  managerLabelUsed: {
    color: colors.muted,
  },
  karenPanel: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.panelBorder,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  karenAvatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  karenAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.panelAlt,
    borderWidth: 2,
    borderColor: colors.panelBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  karenAvatarIcon: {
    fontSize: 26,
  },
  karenInfo: {
    flex: 1,
    gap: 2,
  },
  karenName: {
    color: colors.text,
    fontFamily: "Inter_700Bold",
    fontSize: 15,
  },
  karenTitle: {
    color: colors.muted,
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginTop: 3,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 8,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
  dialogueBubble: {
    backgroundColor: "#2c1212",
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.red,
    gap: 4,
  },
  dialogueLabel: {
    color: colors.red,
    fontSize: 8,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  dialogueText: {
    color: colors.text,
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    lineHeight: 19,
    fontStyle: "italic",
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 6,
    justifyContent: "flex-end",
  },
  chatEmptyHint: {
    color: colors.muted,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    textAlign: "center",
    fontStyle: "italic",
  },
  chatBubble: {
    borderRadius: 8,
    padding: 10,
    gap: 2,
    maxWidth: "88%",
  },
  karenBubble: {
    backgroundColor: "#2c1212",
    borderWidth: 1,
    borderColor: "#4a1a1a",
    alignSelf: "flex-start",
  },
  playerBubble: {
    backgroundColor: "#0f2015",
    borderWidth: 1,
    borderColor: "#1a4a28",
    alignSelf: "flex-end",
  },
  chatSource: {
    fontSize: 8,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
    color: colors.muted,
  },
  chatText: {
    color: colors.text,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 17,
  },
  controls: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 8,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.panelBorder,
  },
  startBtn: {
    backgroundColor: colors.red,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    width: "100%",
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 8,
  },
  startBtnText: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    letterSpacing: 1,
  },
  startBtnSub: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    marginTop: 3,
  },
  micArea: {
    alignItems: "center",
    gap: 6,
    width: "100%",
  },
  micIndicator: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.panelAlt,
    borderWidth: 2,
    borderColor: colors.panelBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  micIndicatorActive: {
    backgroundColor: "#0f2015",
    borderColor: colors.green,
    shadowColor: colors.green,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 8,
  },
  micIndicatorKaren: {
    backgroundColor: "#2c1212",
    borderColor: colors.red,
  },
  micIconEmoji: {
    fontSize: 24,
  },
  micHint: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    letterSpacing: 0.4,
  },
  playerTranscript: {
    width: "100%",
    backgroundColor: "#0f2015",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#1a4a28",
  },
  playerTranscriptLabel: {
    color: colors.green,
    fontSize: 8,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
    marginBottom: 2,
  },
  playerTranscriptText: {
    color: colors.text,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 17,
    fontStyle: "italic",
  },
  quitBtn: {
    borderWidth: 1,
    borderColor: colors.panelBorder,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 24,
  },
  quitBtnText: {
    color: colors.muted,
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 2,
  },
});
