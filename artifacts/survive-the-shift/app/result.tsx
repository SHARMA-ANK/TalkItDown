import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGame } from "@/context/GameContext";
import colors from "@/constants/colors";

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function ResultScreen() {
  const insets = useSafeAreaInsets();
  const { won: wonParam } = useLocalSearchParams<{ won: string }>();
  const { history, haptics } = useGame();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const won = wonParam === "1";
  const lastResult = history[0];

  useEffect(() => {
    if (haptics) {
      if (won) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      else Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, []);

  const receipt = lastResult
    ? `SURVIVE THE SHIFT
================================
Employee:     ${lastResult.customerName.split(" ")[0].toLowerCase()}_survivor
Customer:     ${lastResult.customerName}
Location:     ${lastResult.location.split("—")[0].trim()}
Complaint:    ${lastResult.complaint.slice(0, 28)}...
Time:         ${formatTime(lastResult.timeSecs)}
Rage peak:    ${lastResult.ragePeak}%
Manager used: ${lastResult.managerUsed ? "Yes" : "No"}
Score earned: +${lastResult.scoreEarned} pts
================================
VERDICT: ${won ? "Professional. Barely." : "Unacceptable."}
================================`
    : "";

  return (
    <ScrollView
      style={[styles.container, won ? null : styles.loseContainer]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad + 24, paddingBottom: botPad + 24 },
      ]}
    >
      {!won && <View style={styles.loseOverlay} />}

      <View style={[styles.receiptCard, !won && styles.loseCard]}>
        {/* Stamp */}
        <View
          style={[
            styles.stampWrap,
            won ? styles.stampWrapWin : styles.stampWrapLose,
          ]}
          pointerEvents="none"
        >
          <Text
            style={[
              styles.stamp,
              won ? styles.stampWin : styles.stampLose,
            ]}
          >
            {won ? "APPROVED" : "TERMINATED"}
          </Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          {won ? (
            <>
              <View style={styles.winCircle}>
                <Text style={styles.winCheck}>✓</Text>
              </View>
              <Text style={styles.winTitle}>{"CUSTOMER\nDE-ESCALATED"}</Text>
            </>
          ) : (
            <Text style={styles.loseTitle}>INCIDENT REPORT</Text>
          )}
        </View>

        {/* Receipt text */}
        <View style={[styles.receiptBody, !won && { opacity: 0.8 }]}>
          <Text style={styles.receiptText}>{receipt}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.btnGroup}>
          {won ? (
            <>
              <TouchableOpacity
                style={styles.secondaryBtn}
                activeOpacity={0.8}
                onPress={() => router.replace("/(tabs)/")}
              >
                <Text style={styles.secondaryBtnText}>SHARE RECEIPT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryBtn}
                activeOpacity={0.85}
                onPress={() => router.replace("/(tabs)/")}
              >
                <Text style={styles.primaryBtnText}>NEXT SHIFT →</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.darkBtn}
                activeOpacity={0.85}
                onPress={() => router.replace("/(tabs)/")}
              >
                <Text style={styles.darkBtnText}>FILE FOR UNEMPLOYMENT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ghostBtn}
                activeOpacity={0.7}
                onPress={() => router.replace("/(tabs)/")}
              >
                <Text style={styles.ghostBtnText}>ACCEPT DEFEAT</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  loseContainer: {
    backgroundColor: colors.loseBg,
  },
  loseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.red,
    opacity: 0.1,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  receiptCard: {
    width: "100%",
    backgroundColor: colors.cardAlt,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 16,
    overflow: "hidden",
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  loseCard: {
    transform: [{ rotate: "1deg" }],
  },
  stampWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 80,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    opacity: 0.18,
  },
  stampWrapWin: {},
  stampWrapLose: {
    zIndex: 20,
    opacity: 1,
  },
  stamp: {
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    letterSpacing: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 8,
    transform: [{ rotate: "-12deg" }],
  },
  stampWin: {
    color: colors.green,
    borderColor: colors.green,
  },
  stampLose: {
    color: colors.red,
    borderColor: colors.red,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  header: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 24,
    zIndex: 10,
  },
  winCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  winCheck: {
    fontSize: 32,
    color: colors.green,
  },
  winTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: -0.5,
    textAlign: "center",
    color: colors.black,
  },
  loseTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    textTransform: "uppercase",
    letterSpacing: -0.5,
    textAlign: "center",
    color: colors.red,
  },
  receiptBody: {
    zIndex: 10,
    marginBottom: 24,
  },
  receiptText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#374151",
    fontWeight: "700" as const,
    lineHeight: 18,
  },
  btnGroup: {
    gap: 12,
    zIndex: 30,
  },
  primaryBtn: {
    backgroundColor: colors.red,
    borderWidth: 2,
    borderColor: colors.red,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  primaryBtnText: {
    color: colors.white,
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  secondaryBtn: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.black,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: colors.black,
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  darkBtn: {
    backgroundColor: colors.black,
    borderWidth: 2,
    borderColor: colors.black,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  darkBtnText: {
    color: colors.white,
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  ghostBtn: {
    paddingVertical: 12,
    alignItems: "center",
  },
  ghostBtnText: {
    color: "#6b7280",
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
});
