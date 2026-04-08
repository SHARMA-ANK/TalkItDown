import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGame } from "@/context/GameContext";
import { useGameAudio } from "@/hooks/useGameAudio";
import colors from "@/constants/colors";
import CharacterScene from "@/components/CharacterScene";
import type { SceneType } from "@/components/CharacterScene";

const MAX_RAGE = 100;
const CUSTOMER_IDLE_MS = 25000;

const SCENE_MAP: Record<string, SceneType> = {
  s1: "grocery",
  s2: "drive-thru",
  s3: "store",
  s4: "coffee",
  boss: "office",
};

type MessageEntry = { role: "user" | "karen"; text: string };

type CallState =
  | "connecting"
  | "karen-speaking"
  | "your-turn"
  | "you-speaking"
  | "processing"
  | "ended";

export default function GameScreen() {
  const insets = useSafeAreaInsets();
  const { currentScenario, recordResult, haptics, soundVolume } = useGame();

  const [rage, setRage] = useState(30);
  const rageRef = useRef(30);
  const ragePeakRef = useRef(30);

  const [callState, setCallState] = useState<CallState>("connecting");
  const callStateRef = useRef<CallState>("connecting");
  const setCS = (s: CallState) => {
    callStateRef.current = s;
    setCallState(s);
  };

  const [interimText, setInterimText] = useState("");
  const [karenSubtitle, setKarenSubtitle] = useState("");
  const [managerUsed, setManagerUsed] = useState(false);
  const managerUsedRef = useRef(false);
  const endedRef = useRef(false);
  const [callDuration, setCallDuration] = useState(0);
  const callDurationRef = useRef(0);

  const silenceCountRef = useRef(0);
  const historyRef = useRef<MessageEntry[]>([]);
  const audioStarted = useRef(false);
  const respondingRef = useRef(false);
  const customerIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recognitionRef = useRef<any>(null);
  const accumulatedRef = useRef("");
  const srActiveRef = useRef(false);
  const holdActiveRef = useRef(false);

  const pulseAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const micScaleAnim = useRef(new Animated.Value(1)).current;

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const scenario = currentScenario;
  const scene: SceneType = scenario ? (SCENE_MAP[scenario.id] ?? "grocery") : "grocery";
  const audioEnabled = soundVolume > 0;

  const handleKarenFinished = useCallback(() => {
    if (endedRef.current) return;
    if (callStateRef.current === "karen-speaking") {
      setCS("your-turn");
      scheduleIdleCheck();
    }
  }, []);

  const { startAmbient, stopKaren, speakKarenRespond, stopAll } = useGameAudio({
    scene,
    enabled: audioEnabled,
    onKarenFinished: handleKarenFinished,
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: false }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 700, useNativeDriver: false }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, { toValue: 1, duration: 450, useNativeDriver: false }),
        Animated.timing(waveAnim, { toValue: 0, duration: 450, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (endedRef.current) return;
    const t = setInterval(() => {
      callDurationRef.current += 1;
      setCallDuration(callDurationRef.current);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const finishGame = useCallback(
    (won: boolean) => {
      if (endedRef.current) return;
      endedRef.current = true;
      setCS("ended");
      stopAll();
      stopSRNow();
      if (customerIdleTimerRef.current) clearTimeout(customerIdleTimerRef.current);
      if (haptics) {
        Haptics.notificationAsync(
          won
            ? Haptics.NotificationFeedbackType.Success
            : Haptics.NotificationFeedbackType.Error
        );
      }
      recordResult({
        scenarioId: scenario?.id ?? "unknown",
        customerName: scenario?.customerName ?? "Unknown",
        location: scenario?.location ?? "Unknown",
        complaint: scenario?.complaint ?? "Unknown",
        timeSecs: callDurationRef.current,
        ragePeak: Math.round(ragePeakRef.current),
        managerUsed: managerUsedRef.current,
        scoreEarned: won ? 500 : 0,
        won,
        timestamp: Date.now(),
      });
      router.replace({ pathname: "/result", params: { won: won ? "1" : "0" } });
    },
    [scenario, haptics, recordResult, stopAll]
  );

  const scheduleIdleCheck = useCallback(() => {
    if (customerIdleTimerRef.current) clearTimeout(customerIdleTimerRef.current);
    customerIdleTimerRef.current = setTimeout(() => {
      if (endedRef.current || respondingRef.current || holdActiveRef.current) return;
      // Don't fire if Karen is still speaking or game is processing a response
      const cs = callStateRef.current;
      if (cs === "karen-speaking" || cs === "processing" || cs === "connecting") return;
      silenceCountRef.current += 1;
      triggerRespond("", silenceCountRef.current);
    }, CUSTOMER_IDLE_MS);
  }, []);

  const triggerRespond = useCallback(
    async (userText: string, silenceCount: number) => {
      if (endedRef.current || respondingRef.current || !scenario) return;
      respondingRef.current = true;
      setCS("processing");
      setInterimText("");

      const history = historyRef.current.slice(-10);
      const currentRage = rageRef.current;

      try {
        const { text, rageDelta, gameOver } = await speakKarenRespond({
          userText,
          customerName: scenario.customerName,
          customerTitle: scenario.customerTitle,
          complaint: scenario.complaint,
          location: scenario.location,
          history,
          rage: currentRage,
          silenceCount,
        });

        if (endedRef.current) return;

        const newRage = Math.min(MAX_RAGE, Math.max(0, currentRage + rageDelta));
        rageRef.current = newRage;
        setRage(newRage);
        if (newRage > ragePeakRef.current) ragePeakRef.current = newRage;

        if (userText.trim()) historyRef.current.push({ role: "user", text: userText.trim() });
        historyRef.current.push({ role: "karen", text });
        setKarenSubtitle(text);
        setCS("karen-speaking");

        // Detect resolution from Karen's spoken words even if AI missed the signal
        const resolvedPhrases = ["thank you", "thanks for", "appreciate it", "appreciate your help",
          "glad that's", "glad it's", "happy with that", "that's all i needed", "i'm satisfied",
          "that works for me", "problem solved", "issue resolved"];
        const textLower = text.toLowerCase();
        const karenSoundsResolved = newRage <= 25 && resolvedPhrases.some(p => textLower.includes(p));

        if (gameOver === "win" || newRage <= 0 || karenSoundsResolved) {
          setTimeout(() => finishGame(true), 1800);
          return;
        }
        if (gameOver === "lose" || newRage >= MAX_RAGE) {
          setTimeout(() => finishGame(false), 1800);
          return;
        }
      } catch {
        setCS("your-turn");
        scheduleIdleCheck();
      } finally {
        respondingRef.current = false;
      }
    },
    [scenario, speakKarenRespond, finishGame, scheduleIdleCheck]
  );

  const stopSRNow = useCallback(() => {
    srActiveRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
  }, []);

  const handleMicPressIn = useCallback(() => {
    if (endedRef.current || respondingRef.current) return;

    holdActiveRef.current = true;

    if (callStateRef.current === "karen-speaking") {
      stopKaren();
    }
    if (customerIdleTimerRef.current) clearTimeout(customerIdleTimerRef.current);
    silenceCountRef.current = 0;

    setCS("you-speaking");
    setInterimText("");
    accumulatedRef.current = "";

    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.spring(micScaleAnim, { toValue: 0.88, useNativeDriver: false, speed: 30 }).start();

    if (Platform.OS !== "web") return;

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    stopSRNow();

    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.lang = "en-US";
    recognitionRef.current = r;
    srActiveRef.current = true;

    r.onresult = (event: any) => {
      if (!holdActiveRef.current && !srActiveRef.current) return;
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) accumulatedRef.current += res[0].transcript + " ";
        else interim = res[0].transcript;
      }
      setInterimText(accumulatedRef.current + interim);
    };

    r.onerror = () => {
      srActiveRef.current = false;
    };

    r.onend = () => {
      srActiveRef.current = false;
      const spoken = accumulatedRef.current.trim();
      accumulatedRef.current = "";
      setInterimText("");
      if (spoken.length > 0 && !endedRef.current) {
        triggerRespond(spoken, 0);
      } else if (!endedRef.current && !respondingRef.current) {
        setCS("your-turn");
        scheduleIdleCheck();
      }
    };

    try {
      r.start();
    } catch {
      srActiveRef.current = false;
    }
  }, [haptics, stopKaren, stopSRNow, triggerRespond, scheduleIdleCheck]);

  const handleMicPressOut = useCallback(() => {
    holdActiveRef.current = false;
    Animated.spring(micScaleAnim, { toValue: 1, useNativeDriver: false, speed: 30 }).start();
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    } else {
      const leftover = accumulatedRef.current.trim();
      accumulatedRef.current = "";
      setInterimText("");
      if (leftover.length > 0) triggerRespond(leftover, 0);
      else {
        setCS("your-turn");
        scheduleIdleCheck();
      }
    }
  }, [haptics, triggerRespond, scheduleIdleCheck]);

  useEffect(() => {
    if (!scenario || audioStarted.current) return;
    audioStarted.current = true;
    if (audioEnabled) startAmbient();
    setTimeout(() => {
      if (!endedRef.current) triggerRespond("", 0);
    }, 800);
    return () => {
      stopSRNow();
      if (customerIdleTimerRef.current) clearTimeout(customerIdleTimerRef.current);
    };
  }, [scenario]);

  const handleManager = useCallback(() => {
    if (managerUsedRef.current || endedRef.current) return;
    managerUsedRef.current = true;
    setManagerUsed(true);
    stopKaren();
    stopSRNow();
    holdActiveRef.current = false;
    const newRage = Math.max(0, rageRef.current - 25);
    rageRef.current = newRage;
    setRage(newRage);
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (customerIdleTimerRef.current) clearTimeout(customerIdleTimerRef.current);
    triggerRespond("I'm getting my manager right now to help you with this.", 0);
  }, [haptics, triggerRespond, stopKaren, stopSRNow]);

  if (!scenario) {
    return (
      <View style={[styles.container, { paddingTop: topPad }]}>
        <Text style={{ color: "#fff" }}>No scenario loaded.</Text>
      </View>
    );
  }

  const rageColor = rage < 40 ? "#22c55e" : rage < 70 ? "#f59e0b" : "#ef4444";
  const mins = Math.floor(callDuration / 60);
  const secs = String(callDuration % 60).padStart(2, "0");
  const canSpeak =
    !endedRef.current &&
    (callState === "your-turn" ||
      callState === "karen-speaking" ||
      callState === "you-speaking");

  const showSubtitle =
    callState === "karen-speaking" ||
    callState === "your-turn" ||
    callState === "processing";

  return (
    <View style={[styles.container, { paddingTop: topPad, paddingBottom: botPad }]}>

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Text style={styles.callDuration}>{mins}:{secs}</Text>
        <View style={styles.rageBarWrap}>
          <View style={styles.rageBarBg}>
            <View style={[styles.rageBarFill, { width: `${rage}%` as any, backgroundColor: rageColor }]} />
          </View>
          <Text style={[styles.rageLabel, { color: rageColor }]}>RAGE {Math.round(rage)}%</Text>
        </View>
        <TouchableOpacity
          style={[styles.mgrBtn, managerUsed && styles.mgrBtnUsed]}
          onPress={handleManager}
          disabled={managerUsed}
          activeOpacity={0.7}
        >
          <Text style={[styles.mgrText, managerUsed && styles.mgrTextUsed]}>
            {managerUsed ? "MGR ✓" : "MGR"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* MAIN SCENE AREA */}
      <View style={styles.sceneWrap}>
        <CharacterScene
          scene={scene}
          gender={scenario.gender}
          isSpeaking={callState === "karen-speaking"}
          subtitle={showSubtitle ? karenSubtitle : ""}
          rage={rage}
        />
      </View>

      {/* CUSTOMER INFO STRIP */}
      <View style={styles.infoStrip}>
        <Text style={styles.customerName} numberOfLines={1}>{scenario.customerName}</Text>
        <Text style={styles.customerMeta} numberOfLines={1}>
          {scenario.customerTitle} · {scenario.location}
        </Text>
      </View>

      {/* STATUS + TRANSCRIPT */}
      <View style={styles.statusArea}>
        {callState === "connecting" && (
          <Text style={styles.stateConnecting}>Connecting...</Text>
        )}
        {callState === "processing" && (
          <Animated.Text
            style={[
              styles.stateProcessing,
              { opacity: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) },
            ]}
          >
            ● ● ●
          </Animated.Text>
        )}
        {callState === "karen-speaking" && (
          <View style={styles.speakingRow}>
            {[7, 17, 11, 23, 15, 21, 9, 19, 13].map((h, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.waveBar,
                  {
                    height: waveAnim.interpolate({ inputRange: [0, 1], outputRange: [4, h] }),
                    backgroundColor: rageColor,
                  },
                ]}
              />
            ))}
            <Text style={[styles.speakingLabel, { color: rageColor }]}>  SPEAKING</Text>
          </View>
        )}
        {callState === "your-turn" && (
          <View style={styles.yourTurnRow}>
            <Animated.View
              style={[
                styles.micDot,
                { opacity: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) },
              ]}
            />
            <Text style={styles.yourTurnText}>Hold mic to respond</Text>
          </View>
        )}
        {callState === "you-speaking" && (
          <View style={styles.speakingRow}>
            {[6, 13, 9, 19, 11, 17, 7, 15, 9].map((h, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.waveBar,
                  {
                    height: waveAnim.interpolate({ inputRange: [0, 1], outputRange: [4, h] }),
                    backgroundColor: "#22c55e",
                  },
                ]}
              />
            ))}
            <Text style={[styles.speakingLabel, { color: "#22c55e" }]}>  YOU'RE SPEAKING</Text>
          </View>
        )}

        {callState === "you-speaking" && interimText.length > 0 && (
          <View style={styles.transcriptBox}>
            <Text style={styles.transcriptText} numberOfLines={2}>
              "{interimText}"
            </Text>
          </View>
        )}
      </View>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.endCallBtn}
          onPress={() => finishGame(false)}
          activeOpacity={0.8}
        >
          <Text style={styles.endCallIcon}>✕</Text>
        </TouchableOpacity>

        <Pressable onPressIn={handleMicPressIn} onPressOut={handleMicPressOut} disabled={!canSpeak}>
          <Animated.View
            style={[
              styles.holdBtn,
              callState === "you-speaking" && styles.holdBtnActive,
              !canSpeak && styles.holdBtnDisabled,
              { transform: [{ scale: micScaleAnim }] },
            ]}
          >
            {callState === "you-speaking" && (
              <Animated.View
                style={[
                  styles.holdPulseRing,
                  {
                    opacity: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] }),
                    transform: [
                      { scale: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.35] }) },
                    ],
                  },
                ]}
              />
            )}
            <Text style={styles.holdMicIcon}>🎤</Text>
            <Text style={styles.holdLabel}>
              {callState === "you-speaking" ? "RELEASE" : "HOLD TO SPEAK"}
            </Text>
          </Animated.View>
        </Pressable>

        <View style={{ width: 52 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
    gap: 10,
  },
  callDuration: { fontFamily: "Inter_700Bold", fontSize: 14, color: "#6b7280", minWidth: 44 },
  rageBarWrap: { flex: 1, gap: 3 },
  rageBarBg: { height: 6, backgroundColor: "#1f1f1f", borderRadius: 3, overflow: "hidden" },
  rageBarFill: { height: 6, borderRadius: 3 },
  rageLabel: { fontFamily: "Inter_700Bold", fontSize: 8, letterSpacing: 1.5 },
  mgrBtn: {
    backgroundColor: "#1c1c1a",
    borderWidth: 1.5,
    borderColor: "#f59e0b",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  mgrBtnUsed: { borderColor: "#374151", opacity: 0.4 },
  mgrText: { color: "#f59e0b", fontFamily: "Inter_700Bold", fontSize: 10 },
  mgrTextUsed: { color: "#374151" },

  sceneWrap: {
    width: "100%",
    backgroundColor: "#0a0a0a",
  },

  infoStrip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderTopColor: "#1f1f1f",
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
    alignItems: "center",
    gap: 2,
  },
  customerName: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#f9fafb",
    letterSpacing: 0.3,
  },
  customerMeta: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#6b7280",
  },

  statusArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 8,
    minHeight: 60,
  },

  stateConnecting: { fontFamily: "Inter_400Regular", fontSize: 14, color: "#6b7280", letterSpacing: 1 },
  stateProcessing: { fontFamily: "Inter_700Bold", fontSize: 22, color: "#6b7280", letterSpacing: 8 },
  speakingRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  waveBar: { width: 3, borderRadius: 2, minHeight: 4 },
  speakingLabel: { fontFamily: "Inter_700Bold", fontSize: 10, letterSpacing: 2 },
  yourTurnRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  micDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#22c55e" },
  yourTurnText: { fontFamily: "Inter_400Regular", fontSize: 13, color: "#9ca3af" },

  transcriptBox: {
    backgroundColor: "#0b1f10",
    borderLeftWidth: 3,
    borderLeftColor: "#22c55e",
    paddingHorizontal: 14,
    paddingVertical: 8,
    width: "100%",
    borderRadius: 4,
  },
  transcriptText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#86efac",
    fontStyle: "italic",
    lineHeight: 19,
  },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingVertical: 18,
    backgroundColor: "#0f0f0f",
    borderTopWidth: 1,
    borderTopColor: "#1a1a1a",
  },

  endCallBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
  },
  endCallIcon: { fontSize: 20, color: "#fff" },

  holdBtn: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "#1a2a1a",
    borderWidth: 3,
    borderColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    position: "relative",
    overflow: "visible",
  },
  holdBtnActive: {
    backgroundColor: "#0d2010",
    borderColor: "#16a34a",
  },
  holdBtnDisabled: {
    borderColor: "#1f2937",
    backgroundColor: "#111",
    opacity: 0.4,
  },
  holdPulseRing: {
    position: "absolute",
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 3,
    borderColor: "#22c55e",
  },
  holdMicIcon: { fontSize: 28 },
  holdLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    color: "#22c55e",
    letterSpacing: 1.5,
    textAlign: "center",
  },
});
