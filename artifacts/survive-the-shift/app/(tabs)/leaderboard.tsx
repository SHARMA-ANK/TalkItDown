import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGame } from "@/context/GameContext";
import colors from "@/constants/colors";

type LeaderboardUser = {
  rank: number;
  name: string;
  score: string;
  time: string;
  initial: string;
  avatarColor: string;
};

const GLOBAL_DATA: LeaderboardUser[] = [
  { rank: 1, name: "@karenslayer99", score: "5,840 pts", time: "0:58", initial: "K", avatarColor: "#eab308" },
  { rank: 2, name: "@retail_survivor", score: "5,200 pts", time: "1:12", initial: "R", avatarColor: "#d1d5db" },
  { rank: 3, name: "@shiftmanager", score: "4,990 pts", time: "1:31", initial: "S", avatarColor: "#d97706" },
  { rank: 4, name: "@just_quit", score: "4,500 pts", time: "1:45", initial: "J", avatarColor: "#374151" },
  { rank: 5, name: "@minimum_wage", score: "4,100 pts", time: "2:05", initial: "M", avatarColor: "#374151" },
  { rank: 6, name: "@cryinginback", score: "3,800 pts", time: "2:15", initial: "C", avatarColor: "#374151" },
  { rank: 7, name: "@closing_shift", score: "3,500 pts", time: "2:40", initial: "C", avatarColor: "#374151" },
  { rank: 8, name: "@need_coffee", score: "3,200 pts", time: "3:10", initial: "N", avatarColor: "#374151" },
  { rank: 9, name: "@please_stop", score: "2,900 pts", time: "3:45", initial: "P", avatarColor: "#374151" },
  { rank: 10, name: "@fired_twice", score: "2,500 pts", time: "4:00", initial: "F", avatarColor: "#374151" },
];

function borderColor(rank: number) {
  if (rank === 1) return "#eab308";
  if (rank === 2) return "#d1d5db";
  if (rank === 3) return "#d97706";
  return "#374151";
}

type TabKey = "GLOBAL" | "FRIENDS" | "MY HISTORY";

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const { history, playerStats } = useGame();
  const [tab, setTab] = useState<TabKey>("GLOBAL");
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const historyData: LeaderboardUser[] = history.map((r, i) => ({
    rank: i + 1,
    name: r.customerName,
    score: `${r.scoreEarned} pts`,
    time: `${Math.floor(r.timeSecs / 60)}:${String(r.timeSecs % 60).padStart(2, "0")}`,
    initial: r.customerName[0],
    avatarColor: r.won ? "#2D7A3A" : "#A32D2D",
  }));

  const tabs: TabKey[] = ["GLOBAL", "FRIENDS", "MY HISTORY"];

  const data = tab === "MY HISTORY" ? historyData : GLOBAL_DATA;

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      {/* Tab Strip */}
      <View style={styles.tabStrip}>
        {tabs.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
            onPress={() => setTab(t)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.seasonLabel}>
        <Text style={styles.seasonText}>Season 4 — Week 2</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => `${item.rank}-${item.name}`}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: botPad + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!!data.length}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No shifts completed yet.</Text>
            <Text style={styles.emptySubText}>Get back on the clock.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.row,
              { borderLeftColor: borderColor(item.rank) },
            ]}
          >
            <Text style={[styles.rank, { color: borderColor(item.rank) }]}>
              {item.rank}
            </Text>
            <View
              style={[
                styles.rowAvatar,
                { backgroundColor: item.avatarColor },
              ]}
            >
              <Text style={styles.rowAvatarText}>{item.initial}</Text>
            </View>
            <View style={styles.rowMeta}>
              <Text style={styles.rowName}>{item.name}</Text>
              <Text style={styles.rowTime}>{item.time}</Text>
            </View>
            <Text style={styles.rowScore}>{item.score}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  tabStrip: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderBottomWidth: 4,
    borderBottomColor: colors.black,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderRightWidth: 2,
    borderRightColor: "#d1d5db",
    borderStyle: "dashed" as const,
  },
  tabBtnActive: {
    backgroundColor: colors.black,
  },
  tabText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.black,
  },
  tabTextActive: {
    color: colors.white,
  },
  seasonLabel: {
    backgroundColor: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    paddingVertical: 8,
    alignItems: "center",
  },
  seasonText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.panelAlt,
    borderLeftWidth: 4,
    padding: 12,
    borderRadius: 2,
  },
  rank: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    width: 32,
    textAlign: "center",
    marginRight: 12,
  },
  rowAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowAvatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: colors.black,
  },
  rowMeta: {
    flex: 1,
  },
  rowName: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: colors.text,
  },
  rowTime: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#6b7280",
    marginTop: 2,
  },
  rowScore: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: colors.white,
    marginLeft: 8,
  },
  empty: {
    paddingTop: 60,
    alignItems: "center",
    gap: 8,
  },
  emptyText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  emptySubText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#4b5563",
    letterSpacing: 1,
  },
});
