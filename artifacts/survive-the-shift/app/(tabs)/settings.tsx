import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
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
import { useGame } from "@/context/GameContext";
import colors from "@/constants/colors";

function Toggle({
  value,
  onToggle,
  haptics: hapticsOn,
}: {
  value: boolean;
  onToggle: () => void;
  haptics: boolean;
}) {
  const anim = React.useRef(new Animated.Value(value ? 1 : 0)).current;
  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [2, 22] });

  return (
    <TouchableOpacity
      style={[styles.toggle, value ? styles.toggleOn : styles.toggleOff]}
      onPress={() => {
        if (hapticsOn) Haptics.selectionAsync();
        onToggle();
      }}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[styles.toggleThumb, { transform: [{ translateX }] }]}
      />
    </TouchableOpacity>
  );
}

function formatTime(secs: number) {
  if (!secs) return "—";
  const m = Math.floor(secs / 60);
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const {
    playerStats,
    haptics,
    setHaptics,
    dailyBossAlerts,
    setDailyBossAlerts,
    setAuthed,
    setIsGuest,
  } = useGame();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleClockOut = () => {
    if (haptics) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setAuthed(false);
    setIsGuest(false);
    router.replace("/");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad + 16, paddingBottom: botPad + 24 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionLabel}>EMPLOYEE FILE</Text>

      {/* Stats receipt */}
      <View style={styles.receipt}>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptKey}>TOTAL SHIFTS:</Text>
          <Text style={styles.receiptValue}>{playerStats.totalShifts}</Text>
        </View>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptKey}>AVG RAGE HANDLED:</Text>
          <Text style={[styles.receiptValue, { color: colors.amber }]}>
            {playerStats.avgRage}%
          </Text>
        </View>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptKey}>PERSONAL BEST:</Text>
          <Text style={[styles.receiptValue, { color: colors.green }]}>
            {formatTime(playerStats.personalBest)}
          </Text>
        </View>
        <View style={[styles.receiptRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.receiptKey}>TOTAL KARENS:</Text>
          <Text style={[styles.receiptValue, { color: colors.red }]}>
            {playerStats.totalKarens}
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>PREFERENCES</Text>

      {/* Preferences panel */}
      <View style={styles.panel}>
        <View style={styles.panelRow}>
          <Text style={styles.panelRowLabel}>Haptics (Feel the rage)</Text>
          <Toggle
            value={haptics}
            onToggle={() => setHaptics(!haptics)}
            haptics={haptics}
          />
        </View>

        <View style={styles.panelRowDivider} />

        <View style={styles.panelRow}>
          <View>
            <Text style={styles.panelRowLabel}>Daily Boss Alerts</Text>
            <Text style={styles.panelRowSub}>
              HR will notify you when a boss arrives
            </Text>
          </View>
          <Toggle
            value={dailyBossAlerts}
            onToggle={() => setDailyBossAlerts(!dailyBossAlerts)}
            haptics={haptics}
          />
        </View>

        <View style={styles.panelRowDivider} />

        <View style={styles.panelSlider}>
          <View style={styles.sliderHeader}>
            <Text style={styles.panelRowLabel}>Sound Effects</Text>
            <Text style={styles.sliderVal}>80%</Text>
          </View>
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: "80%" }]} />
          </View>
        </View>

        <View style={styles.panelRowDivider} />

        <View style={styles.panelSlider}>
          <View style={styles.sliderHeader}>
            <Text style={styles.panelRowLabel}>Karen Voice Volume</Text>
            <Text style={[styles.sliderVal, { color: colors.red }]}>MAX</Text>
          </View>
          <View style={styles.sliderTrack}>
            <View
              style={[
                styles.sliderFill,
                { width: "100%", backgroundColor: colors.red },
              ]}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.clockOutBtn}
        onPress={handleClockOut}
        activeOpacity={0.8}
      >
        <Text style={styles.clockOutText}>⇤ CLOCK OUT</Text>
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
  },
  sectionLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 4,
    color: colors.muted,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  receipt: {
    backgroundColor: colors.card,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#d1d5db",
    borderStyle: "dashed" as const,
  },
  receiptKey: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    textTransform: "uppercase",
    color: "#6b7280",
    letterSpacing: 1,
  },
  receiptValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    textTransform: "uppercase",
    color: colors.black,
  },
  panel: {
    backgroundColor: colors.panel,
    borderWidth: 2,
    borderColor: "#374151",
    borderRadius: 2,
    overflow: "hidden",
  },
  panelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  panelRowDivider: {
    height: 1,
    backgroundColor: "#374151",
  },
  panelRowLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: colors.text,
  },
  panelRowSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
    maxWidth: 200,
  },
  toggle: {
    width: 48,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
  },
  toggleOn: {
    backgroundColor: colors.amber,
  },
  toggleOff: {
    backgroundColor: "#374151",
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  panelSlider: {
    padding: 16,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sliderVal: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#6b7280",
  },
  sliderTrack: {
    height: 8,
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 4,
    overflow: "hidden",
  },
  sliderFill: {
    height: "100%",
    backgroundColor: "#9ca3af",
    borderRadius: 4,
  },
  clockOutBtn: {
    marginTop: 32,
    borderWidth: 2,
    borderColor: colors.red,
    borderStyle: "dashed" as const,
    paddingVertical: 16,
    alignItems: "center",
  },
  clockOutText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: colors.red,
  },
});
