import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
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

export default function ScenarioScreen() {
  const insets = useSafeAreaInsets();
  const { currentScenario, haptics } = useGame();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  if (!currentScenario) {
    router.replace("/(tabs)/");
    return null;
  }

  const s = currentScenario;

  const handleBegin = () => {
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/game");
  };

  const threatDots = Array.from({ length: 5 }, (_, i) => i < s.threatLevel);
  const threatLabel =
    s.threatLevel <= 1
      ? "LOW"
      : s.threatLevel <= 2
      ? "MILD"
      : s.threatLevel <= 3
      ? "MODERATE"
      : s.threatLevel <= 4
      ? "HIGH"
      : "CRITICAL";
  const threatColor =
    s.threatLevel <= 2 ? colors.green : s.threatLevel <= 3 ? colors.amber : colors.red;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad + 16, paddingBottom: botPad + 24 },
      ]}
      scrollEnabled={false}
    >
      <View style={styles.receiptCard}>
        <View style={styles.receiptInner}>
          <View style={styles.receiptHeader}>
            <Text style={styles.receiptTitle}>SHIFT ASSIGNMENT</Text>
            <Text style={styles.receiptNum}>
              #
              {String(s.id).replace(/\D/g, "").padStart(4, "0") || "0047"}
            </Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>LOCATION:</Text>
            <Text style={styles.fieldValue}>{s.location}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>CUSTOMER:</Text>
            <Text style={[styles.fieldValue, { fontSize: 17 }]}>
              {s.customerName}, {s.customerAge}
            </Text>
            <View style={styles.titleBadge}>
              <Text style={styles.titleBadgeText}>{s.customerTitle}</Text>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>COMPLAINT:</Text>
            <Text style={[styles.fieldValue, { color: colors.red }]}>
              {s.complaint}
            </Text>
          </View>

          <View style={styles.field}>
            <View style={styles.threatHeaderRow}>
              <Text style={styles.fieldLabel}>THREAT LEVEL:</Text>
              <View style={styles.threatDots}>
                {threatDots.map((filled, i) => (
                  <Text
                    key={i}
                    style={[
                      styles.dot,
                      { color: filled ? colors.red : "#9ca3af" },
                    ]}
                  >
                    ●
                  </Text>
                ))}
              </View>
            </View>
            <Text style={[styles.fieldValue, { color: threatColor }]}>
              {threatLabel}
            </Text>
            <Text style={styles.threatNote}>
              — she has a rewards card and knows your manager's name
            </Text>
          </View>

          <View style={[styles.field, { borderBottomWidth: 0 }]}>
            <Text style={styles.fieldLabel}>TIME ESTIMATE:</Text>
            <Text style={styles.fieldValue}>{s.timeEstimate}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.beginBtn}
          onPress={handleBegin}
          activeOpacity={0.85}
        >
          <Text style={styles.beginBtnText}>BEGIN ENCOUNTER ▶</Text>
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
    alignItems: "center",
    paddingHorizontal: 16,
  },
  receiptCard: {
    width: "100%",
    backgroundColor: colors.cardAlt,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    transform: [{ rotate: "1deg" }],
  },
  receiptInner: {
    margin: 12,
    borderWidth: 4,
    borderColor: colors.black,
    padding: 16,
  },
  receiptHeader: {
    borderBottomWidth: 4,
    borderBottomColor: colors.black,
    paddingBottom: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  receiptTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
    textTransform: "uppercase",
    color: colors.black,
  },
  receiptNum: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    fontWeight: "bold" as const,
    letterSpacing: 4,
    marginTop: 4,
    color: colors.black,
  },
  field: {
    borderBottomWidth: 2,
    borderBottomColor: "#9ca3af",
    borderStyle: "dashed" as const,
    paddingBottom: 10,
    marginBottom: 12,
  },
  fieldLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    textTransform: "uppercase",
    color: "#6b7280",
    letterSpacing: 1,
    marginBottom: 4,
  },
  fieldValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: colors.black,
  },
  titleBadge: {
    backgroundColor: colors.black,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
  },
  titleBadgeText: {
    color: colors.white,
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  threatHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  threatDots: {
    flexDirection: "row",
    gap: 2,
  },
  dot: {
    fontSize: 12,
  },
  threatNote: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    fontStyle: "italic",
    color: "#6b7280",
    marginTop: 4,
  },
  beginBtn: {
    backgroundColor: colors.red,
    borderWidth: 4,
    borderColor: colors.black,
    paddingVertical: 18,
    margin: 12,
    marginTop: 0,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  beginBtnText: {
    color: colors.white,
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    letterSpacing: 4,
    textTransform: "uppercase",
  },
});
