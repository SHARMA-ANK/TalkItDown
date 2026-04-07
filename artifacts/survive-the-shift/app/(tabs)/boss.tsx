import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BOSS_SCENARIO, useGame } from "@/context/GameContext";
import colors from "@/constants/colors";

const TOP_SURVIVORS = [
  { rank: 1, name: "@karenslayer99", score: "8,940", time: "0:42", mgr: false },
  { rank: 2, name: "@manager_mike", score: "8,200", time: "0:51", mgr: false },
  { rank: 3, name: "@newhire_tears", score: "7,450", time: "1:04", mgr: true },
  { rank: 4, name: "@retail_king", score: "7,100", time: "1:15", mgr: false },
  { rank: 5, name: "@just_quit", score: "6,900", time: "1:22", mgr: true },
];

function Countdown() {
  const [secs, setSecs] = useState(6 * 3600 + 42 * 60 + 18);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function rankColor(rank: number) {
  if (rank === 1) return "#eab308";
  if (rank === 2) return "#d1d5db";
  if (rank === 3) return "#d97706";
  return "#6b7280";
}

export default function BossScreen() {
  const insets = useSafeAreaInsets();
  const { setCurrentScenario, haptics } = useGame();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleChallenge = () => {
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setCurrentScenario(BOSS_SCENARIO);
    router.push("/scenario");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad, paddingBottom: botPad + 24 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBanner}>
        <Text style={styles.topBannerText}>⚠ TODAY'S BOSS ⚠</Text>
      </View>

      <View style={styles.body}>
        {/* Boss Profile */}
        <View style={styles.bossCard}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>LVL 99</Text>
          </View>
          <View style={styles.bossAvatar}>
            <Text style={styles.bossAvatarLetter}>D</Text>
          </View>
          <Text style={styles.bossName}>DEBORAH M.</Text>
          <View style={styles.bossTitleBadge}>
            <Text style={styles.bossTitleText}>REGIONAL MANAGER'S WIFE</Text>
          </View>
          <Text style={styles.bossQuote}>
            "Armed with a coupon from 2019, a Facebook group admin badge, and
            absolutely nothing to lose."
          </Text>
        </View>

        {/* Stats strip */}
        <View style={styles.statsStrip}>
          <Text style={styles.statsAttempts}>
            7,432 PLAYERS ATTEMPTED · 23% SURVIVED
          </Text>
          <Text style={styles.statsCountdown}>
            ⏱ NEW BOSS IN <Countdown />
          </Text>
        </View>

        {/* Mini leaderboard */}
        <View style={styles.leaderboard}>
          <View style={styles.leaderboardHeader}>
            <Text style={styles.leaderboardHeaderText}>🏆 TOP SURVIVORS</Text>
          </View>
          {TOP_SURVIVORS.map((row) => (
            <View key={row.rank} style={styles.leaderboardRow}>
              <Text style={[styles.rowRank, { color: rankColor(row.rank) }]}>
                #{row.rank}
              </Text>
              <Text style={styles.rowName}>{row.name}</Text>
              <View style={styles.rowRight}>
                <Text style={styles.rowTime}>{row.time}</Text>
                <Text style={styles.rowScore}>{row.score}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.challengeBtn}
          onPress={handleChallenge}
          activeOpacity={0.85}
        >
          <Text style={styles.challengeBtnText}>CHALLENGE BOSS</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingBottom: 0,
  },
  topBanner: {
    backgroundColor: colors.amber,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: colors.amber,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  topBannerText: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    letterSpacing: 4,
    textTransform: "uppercase",
    color: colors.black,
  },
  body: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  bossCard: {
    backgroundColor: colors.card,
    borderWidth: 8,
    borderColor: colors.amber,
    padding: 24,
    alignItems: "center",
    position: "relative",
  },
  levelBadge: {
    position: "absolute",
    top: -12,
    right: -12,
    backgroundColor: colors.black,
    borderWidth: 2,
    borderColor: colors.amber,
    paddingHorizontal: 8,
    paddingVertical: 4,
    transform: [{ rotate: "3deg" }],
  },
  levelText: {
    color: colors.amber,
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 1,
  },
  bossAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.black,
    borderWidth: 4,
    borderColor: colors.amber,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: colors.amber,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  bossAvatarLetter: {
    fontFamily: "Inter_700Bold",
    fontSize: 48,
    color: colors.amber,
  },
  bossName: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    letterSpacing: -1,
    textTransform: "uppercase",
    color: colors.black,
    marginBottom: 8,
  },
  bossTitleBadge: {
    backgroundColor: colors.black,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  bossTitleText: {
    color: colors.text,
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  bossQuote: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    fontStyle: "italic",
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
    borderTopWidth: 2,
    borderTopColor: "#d1d5db",
    borderStyle: "dashed" as const,
    paddingTop: 16,
  },
  statsStrip: {
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: "#374151",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 4,
  },
  statsAttempts: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: colors.amber,
    letterSpacing: 1,
    textTransform: "uppercase",
    textAlign: "center",
  },
  statsCountdown: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
  leaderboard: {
    backgroundColor: colors.panelAlt,
    borderWidth: 1,
    borderColor: "#374151",
    overflow: "hidden",
  },
  leaderboardHeader: {
    backgroundColor: colors.black,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leaderboardHeaderText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: "#9ca3af",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  leaderboardRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  rowRank: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    width: 32,
    textAlign: "center",
  },
  rowName: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: colors.text,
    flex: 1,
  },
  rowRight: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  rowTime: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#6b7280",
  },
  rowScore: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: colors.white,
    width: 56,
    textAlign: "right",
  },
  challengeBtn: {
    backgroundColor: colors.amber,
    paddingVertical: 22,
    alignItems: "center",
    shadowColor: colors.amber,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  challengeBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    letterSpacing: 4,
    textTransform: "uppercase",
    color: colors.black,
  },
});
