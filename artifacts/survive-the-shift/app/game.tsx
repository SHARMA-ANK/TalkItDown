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
import colors from "@/constants/colors";

const GAME_DURATION = 90;
const RAGE_DECAY_RATE = 0.4;
const RAGE_SURGE_RATE = 2.0;
const DIALOGUE_CYCLE_MS = 5000;
const MAX_RAGE = 100;

export default function GameScreen() {
  const insets = useSafeAreaInsets();
  const { currentScenario, recordResult, haptics } = useGame();
  const [rage, setRage] = useState(30);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [managerUsed, setManagerUsed] = useState(false);
  const [ragePeak, setRagePeak] = useState(30);
  const [ended, setEnded] = useState(false);
  const pulseAnim = useRef(new Animated.Value(0)).current;

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const scenario = currentScenario;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => {
      setRage((prev) => {
        const surge = isListening ? -RAGE_DECAY_RATE : RAGE_SURGE_RATE * 0.3;
        const next = Math.min(MAX_RAGE, Math.max(0, prev + surge));
        setRagePeak((pk) => Math.max(pk, next));
        return next;
      });
    }, 200);
    return () => clearInterval(t);
  }, [isListening, ended]);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [ended]);

  useEffect(() => {
    if (!scenario) return;
    const t = setInterval(() => {
      setDialogueIdx((i) => (i + 1) % scenario.dialogue.length);
    }, DIALOGUE_CYCLE_MS);
    return () => clearInterval(t);
  }, [scenario]);

  const handleEnd = useCallback(
    (won: boolean) => {
      if (ended) return;
      setEnded(true);
      if (haptics) {
        if (won) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        else Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      const elapsed = GAME_DURATION - timeLeft;
      const bonus = won ? Math.max(0, 300 - elapsed * 2) : 0;
      const managerBonus = !managerUsed && won ? 100 : 0;
      const scoreEarned = won ? 200 + bonus + managerBonus : 0;
      recordResult({
        scenarioId: scenario?.id ?? "unknown",
        customerName: scenario?.customerName ?? "Unknown",
        location: scenario?.location ?? "Unknown",
        complaint: scenario?.complaint ?? "Unknown",
        timeSecs: elapsed,
        ragePeak: Math.round(ragePeak),
        managerUsed,
        scoreEarned,
        won,
        timestamp: Date.now(),
      });
      router.replace({ pathname: "/result", params: { won: won ? "1" : "0" } });
    },
    [ended, timeLeft, ragePeak, managerUsed, scenario, haptics, recordResult]
  );

  useEffect(() => {
    if (!ended && rage >= MAX_RAGE) {
      handleEnd(false);
    }
    if (!ended && timeLeft === 0) {
      handleEnd(true);
    }
  }, [rage, timeLeft, ended, handleEnd]);

  const handleMicPress = () => {
    setIsListening((prev) => !prev);
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleManager = () => {
    if (managerUsed) return;
    setManagerUsed(true);
    setRage((r) => Math.max(0, r - 30));
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  if (!scenario) {
    return (
      <View style={[styles.container, { paddingTop: topPad }]}>
        <Text style={{ color: colors.text }}>No scenario loaded.</Text>
      </View>
    );
  }

  const rageColor =
    rage < 40 ? colors.green : rage < 70 ? colors.amber : colors.red;
  const mins = Math.floor(timeLeft / 60);
  const secs = String(timeLeft % 60).padStart(2, "0");

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <View style={[styles.container, { paddingBottom: botPad }]}>
      {/* Status bar */}
      <View style={[styles.statusBar, { paddingTop: topPad }]}>
        <View style={styles.locationBadge}>
          <Text style={styles.locationText}>
            {scenario.location.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.timer}>
          {mins}:{secs}
        </Text>
        <TouchableOpacity
          style={[
            styles.mgrBtn,
            managerUsed && { borderColor: "#4b5563", opacity: 0.5 },
          ]}
          onPress={handleManager}
          disabled={managerUsed}
          activeOpacity={0.7}
        >
          <Text style={[styles.mgrText, managerUsed && { color: "#4b5563" }]}>
            MGR{" "}
          </Text>
          <View
            style={[
              styles.mgrBadge,
              managerUsed && { backgroundColor: "#4b5563" },
            ]}
          >
            <Text style={styles.mgrBadgeText}>
              {managerUsed ? "✓" : "1×"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Rage meter */}
      <View style={styles.rageMeterWrap}>
        <View style={styles.rageMeterLabels}>
          <Text style={[styles.rageMeterLabel, { color: colors.green }]}>
            CALM
          </Text>
          <Text style={[styles.rageMeterLabel, { color: colors.text }]}>
            RAGE: {Math.round(rage)}%
          </Text>
          <Text style={[styles.rageMeterLabel, { color: colors.red }]}>
            FIRED
          </Text>
        </View>
        <View style={styles.rageMeterBar}>
          <View
            style={[
              styles.rageMeterFill,
              { width: `${rage}%` as any, backgroundColor: rageColor },
            ]}
          />
        </View>
      </View>

      {/* Customer zone */}
      <View style={styles.customerZone}>
        <Animated.View style={[styles.customerCard, { opacity: pulseOpacity }]}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>
              {scenario.customerName[0]}
            </Text>
          </View>
          <Text style={styles.customerName}>{scenario.customerName}</Text>
          <View style={styles.customerTitleBadge}>
            <Text style={styles.customerTitleText}>
              {scenario.customerTitle.toUpperCase()}
            </Text>
          </View>
        </Animated.View>

        {/* Speech bubble */}
        <View style={styles.bubbleWrap}>
          <View style={styles.bubbleArrow} />
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>
              "{scenario.dialogue[dialogueIdx]}"
            </Text>
          </View>
        </View>
      </View>

      {/* Player controls */}
      <View style={styles.controls}>
        <Text style={styles.listeningLabel}>
          {isListening ? "De-escalating..." : "Tap mic to respond"}
        </Text>

        <View style={styles.micRow}>
          <View style={styles.waveLeft}>
            <View style={[styles.wavebar, { height: 16 }]} />
            <View style={[styles.wavebar, { height: 32 }]} />
          </View>

          <TouchableOpacity
            style={[
              styles.micBtn,
              isListening && { backgroundColor: colors.green, borderColor: "#1a5c26" },
            ]}
            onPress={handleMicPress}
            activeOpacity={0.85}
          >
            <Text style={styles.micIcon}>{isListening ? "⏹" : "🎤"}</Text>
          </TouchableOpacity>

          <View style={styles.waveRight}>
            <View style={[styles.wavebar, { height: 24 }]} />
            <View style={[styles.wavebar, { height: 12 }]} />
            <View style={[styles.wavebar, { height: 20 }]} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.deEscalateBtn}
          onPress={() => handleEnd(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.deEscalateBtnText}>
            ✓ CUSTOMER DE-ESCALATED
          </Text>
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
  statusBar: {
    backgroundColor: colors.panelAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.panelBorder,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationBadge: {
    backgroundColor: colors.black,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#374151",
    flex: 1,
    marginRight: 8,
  },
  locationText: {
    color: "#9ca3af",
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    letterSpacing: 1,
  },
  timer: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: colors.white,
    marginRight: 8,
  },
  mgrBtn: {
    backgroundColor: colors.bg,
    borderWidth: 2,
    borderColor: colors.amber,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  mgrText: {
    color: colors.amber,
    fontFamily: "Inter_700Bold",
    fontSize: 11,
  },
  mgrBadge: {
    backgroundColor: colors.amber,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  mgrBadgeText: {
    color: colors.black,
    fontFamily: "Inter_700Bold",
    fontSize: 10,
  },
  rageMeterWrap: {
    backgroundColor: colors.panel,
    padding: 16,
  },
  rageMeterLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rageMeterLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 1,
  },
  rageMeterBar: {
    height: 24,
    backgroundColor: colors.black,
    borderWidth: 2,
    borderColor: "#374151",
    padding: 2,
  },
  rageMeterFill: {
    flex: 1,
    minWidth: 0,
  },
  customerZone: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  customerCard: {
    backgroundColor: colors.card,
    borderWidth: 4,
    borderColor: colors.amber,
    padding: 24,
    width: "100%",
    maxWidth: 280,
    alignItems: "center",
    shadowColor: colors.amber,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 0,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cardAlt,
    borderWidth: 4,
    borderColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarLetter: {
    fontFamily: "Inter_700Bold",
    fontSize: 40,
    color: "#8B4513",
  },
  customerName: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    letterSpacing: -0.5,
    color: colors.black,
  },
  customerTitleBadge: {
    backgroundColor: colors.black,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
  },
  customerTitleText: {
    color: colors.white,
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  bubbleWrap: {
    width: "100%",
    maxWidth: 300,
    marginTop: 20,
  },
  bubbleArrow: {
    width: 16,
    height: 16,
    backgroundColor: colors.cardAlt,
    transform: [{ rotate: "45deg" }],
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#d1d5db",
    alignSelf: "center",
    marginBottom: -8,
  },
  bubble: {
    backgroundColor: colors.cardAlt,
    borderWidth: 2,
    borderColor: "#d1d5db",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  bubbleText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: colors.black,
    textTransform: "uppercase",
    lineHeight: 20,
  },
  controls: {
    backgroundColor: colors.panel,
    borderTopWidth: 1,
    borderTopColor: colors.panelBorder,
    padding: 24,
    alignItems: "center",
  },
  listeningLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 16,
    letterSpacing: 1,
  },
  micRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 20,
  },
  waveLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  waveRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  wavebar: {
    width: 4,
    backgroundColor: "#4b5563",
    borderRadius: 2,
  },
  micBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.red,
    borderWidth: 4,
    borderColor: colors.redDark,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  micIcon: {
    fontSize: 28,
  },
  deEscalateBtn: {
    width: "100%",
    maxWidth: 280,
    borderWidth: 2,
    borderColor: colors.green,
    paddingVertical: 14,
    alignItems: "center",
  },
  deEscalateBtnText: {
    color: colors.green,
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
