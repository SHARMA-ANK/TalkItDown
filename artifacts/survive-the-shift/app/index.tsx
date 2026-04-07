import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";

const FULL_WORD = "SURVIVOR";

export default function SplashScreen() {
  const insets = useSafeAreaInsets();
  const [typed, setTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;

  const doneTyping = typed.length === FULL_WORD.length;

  useEffect(() => {
    if (typed.length < FULL_WORD.length) {
      const delay = typed.length === 0 ? 600 : 110;
      const t = setTimeout(() => {
        setTyped(FULL_WORD.slice(0, typed.length + 1));
      }, delay);
      return () => clearTimeout(t);
    }
  }, [typed]);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (doneTyping) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          delay: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [doneTyping]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: topPad + 24, paddingBottom: bottomPad + 24 },
      ]}
    >
      <View style={styles.center}>
        {/* Nametag badge */}
        <View style={styles.nametag}>
          <View style={styles.nametagHeader}>
            <Text style={styles.helloText}>HELLO</Text>
          </View>
          <Text style={styles.myNameIs}>my name is:</Text>
          <View style={styles.nametagBody}>
            <Text style={styles.survivorText}>
              {typed}
              <Text style={{ opacity: cursorVisible ? 1 : 0 }}>|</Text>
            </Text>
          </View>
        </View>

        <Animated.View
          style={[
            styles.taglineRow,
            { opacity: fadeAnim },
          ]}
        >
          <Text style={styles.tagline}>
            Train for the worst shift of your life.
          </Text>
          <View style={styles.amberPulse} />
        </Animated.View>

        <Animated.View
          style={[
            styles.btnWrap,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.clockInBtn}
            activeOpacity={0.8}
            onPress={() => router.replace("/auth")}
          >
            <Text style={styles.clockInText}>CLOCK IN →</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLine}>System initializing...</Text>
        <Text style={styles.footerLine}>Connecting to HR database...</Text>
        <Text style={styles.footerLineLight}>
          {"Loading Karen... ████████░░"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 24,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  nametag: {
    backgroundColor: colors.card,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    transform: [{ rotate: "-2deg" }],
  },
  nametagHeader: {
    backgroundColor: colors.red,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: colors.redDark,
  },
  helloText: {
    color: colors.white,
    fontFamily: "Inter_700Bold",
    letterSpacing: 6,
    fontSize: 14,
  },
  myNameIs: {
    textAlign: "center",
    paddingVertical: 4,
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  nametagBody: {
    paddingVertical: 32,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 96,
  },
  survivorText: {
    fontSize: 40,
    fontFamily: "Inter_700Bold",
    color: colors.black,
    letterSpacing: -2,
  },
  taglineRow: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 32,
  },
  tagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: colors.muted,
  },
  amberPulse: {
    width: 8,
    height: 20,
    backgroundColor: colors.amber,
  },
  btnWrap: {
    width: "100%",
    marginTop: 24,
  },
  clockInBtn: {
    backgroundColor: colors.card,
    borderWidth: 4,
    borderColor: colors.red,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: colors.red,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  clockInText: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    letterSpacing: 6,
    color: colors.black,
    textTransform: "uppercase",
  },
  footer: {
    gap: 4,
  },
  footerLine: {
    fontFamily: "Inter_400Regular",
    color: colors.muted,
    fontSize: 12,
  },
  footerLineLight: {
    fontFamily: "Inter_400Regular",
    color: colors.text,
    fontSize: 12,
  },
});
