import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SCENARIOS, useGame } from "@/context/GameContext";
import colors from "@/constants/colors";

function Countdown() {
  const [secs, setSecs] = useState(6 * 3600 + 42 * 60 + 18);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return (
    <Text style={styles.bossCountdown}>
      resets in {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:
      {String(s).padStart(2, "0")}
    </Text>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { playerStats, setCurrentScenario, haptics } = useGame();
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleStartShift = () => {
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const pick = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    setCurrentScenario(pick);
    router.push("/scenario");
  };

  const handleBossFight = () => {
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.push("/(tabs)/boss");
  };

  const initial = playerStats.username.replace(/[^a-z]/gi, "")[0]?.toUpperCase() ?? "E";
  const score = playerStats.totalScore.toLocaleString();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad + 16, paddingBottom: botPad + 24 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBar}>
        <Text style={styles.breakroomLabel}>THE BREAK ROOM</Text>
      </View>

      {/* Player Nametag Card */}
      <View style={styles.nametagCard}>
        <View style={styles.nametagCardTop}>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
            <View>
              <Text style={styles.employeeLabel}>Employee</Text>
              <Text style={styles.username}>{playerStats.username}</Text>
            </View>
          </View>
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Survival Score</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>
        </View>

        <View style={styles.streakRow}>
          <Animated.View
            style={[
              styles.streakDot,
              {
                opacity: pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.4, 1],
                }),
              },
            ]}
          />
          <Text style={styles.streakText}>
            {playerStats.streak}-DAY STREAK — YOU SHOWED UP
          </Text>
        </View>
      </View>

      {/* Start Shift */}
      <TouchableOpacity
        style={styles.startShiftBtn}
        onPress={handleStartShift}
        activeOpacity={0.85}
      >
        <Text style={styles.startShiftText}>START SHIFT</Text>
        <Text style={styles.startShiftSub}>Another day, another dollar</Text>
      </TouchableOpacity>

      {/* Boss Fight */}
      <TouchableOpacity
        style={styles.bossFightBtn}
        onPress={handleBossFight}
        activeOpacity={0.85}
      >
        <View style={styles.dailyBadge}>
          <Text style={styles.dailyBadgeText}>Daily</Text>
        </View>
        <View style={styles.bossFightInner}>
          <Text style={styles.bossIcon}>⚠</Text>
          <Text style={styles.bossFightText}>BOSS FIGHT</Text>
        </View>
        <Text style={styles.bossFightName}>TODAY: DEBORAH M.</Text>
        <Countdown />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  breakroomLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 4,
    color: colors.muted,
    textTransform: "uppercase",
  },
  nametagCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 20,
    borderTopWidth: 8,
    borderTopColor: colors.red,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nametagCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e5e7eb",
    borderWidth: 2,
    borderColor: "#9ca3af",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: colors.black,
  },
  employeeLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.black,
  },
  username: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#6b7280",
  },
  scoreBlock: {
    alignItems: "flex-end",
  },
  scoreLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#6b7280",
  },
  scoreValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 36,
    color: colors.black,
    letterSpacing: -2,
    lineHeight: 42,
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: "#e5e7eb",
    borderStyle: "dashed" as const,
  },
  streakDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red,
  },
  streakText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: colors.red,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  startShiftBtn: {
    backgroundColor: colors.card,
    borderWidth: 4,
    borderColor: colors.red,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: colors.red,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  startShiftText: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    textTransform: "uppercase",
    letterSpacing: 4,
    color: colors.red,
    marginBottom: 4,
  },
  startShiftSub: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#6b7280",
  },
  bossFightBtn: {
    backgroundColor: colors.bg,
    borderWidth: 4,
    borderColor: colors.amber,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  dailyBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.amber,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  dailyBadgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.black,
  },
  bossFightInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  bossIcon: {
    color: colors.amber,
    fontSize: 18,
  },
  bossFightText: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    textTransform: "uppercase",
    letterSpacing: 4,
    color: colors.amber,
  },
  bossFightName: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#9ca3af",
    letterSpacing: 1,
    marginBottom: 8,
  },
  bossCountdown: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: colors.amber,
    opacity: 0.8,
  },
});
