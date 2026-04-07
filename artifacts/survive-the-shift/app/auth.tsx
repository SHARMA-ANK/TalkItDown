import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGame } from "@/context/GameContext";
import { useAuth } from "@/lib/auth";
import colors from "@/constants/colors";

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const { setAuthed, setIsGuest } = useGame();
  const { isAuthenticated, isLoading, login, user } = useAuth();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  useEffect(() => {
    if (isAuthenticated && user) {
      setAuthed(true);
      setIsGuest(false);
      router.replace("/(tabs)/");
    }
  }, [isAuthenticated, user]);

  const handleSignIn = async () => {
    await login();
  };

  const handleGuest = () => {
    setIsGuest(true);
    router.replace("/(tabs)/");
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: topPad + 24 },
      ]}
    >
      <View style={styles.card}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoLetter}>S</Text>
        </View>

        <View style={styles.headingBlock}>
          <Text style={styles.heading}>{"Create Your\nEmployee File"}</Text>
          <Text style={styles.subheading}>Your survival score will be tracked.</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.btnGroup}>
          {isLoading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="small" color={colors.red} />
              <Text style={styles.loadingText}>Verifying employee credentials...</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.signInBtn}
              activeOpacity={0.85}
              onPress={handleSignIn}
            >
              <Text style={styles.signInBtnText}>Sign In</Text>
              <Text style={styles.signInBtnSub}>— HR requires this.</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.guestBtn}
          activeOpacity={0.7}
          onPress={handleGuest}
        >
          <Text style={styles.guestBtnText}>
            {"or continue without saving your score \u2192"}
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 16,
    alignItems: "center",
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -56,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoLetter: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: colors.red,
  },
  headingBlock: {
    alignItems: "center",
    paddingBottom: 24,
    width: "100%",
  },
  heading: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    textTransform: "uppercase",
    letterSpacing: -0.5,
    textAlign: "center",
    color: colors.black,
    lineHeight: 28,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: colors.muted,
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 2,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 24,
  },
  btnGroup: {
    width: "100%",
    gap: 12,
    marginBottom: 24,
  },
  loadingBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 14,
  },
  loadingText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: colors.muted,
  },
  signInBtn: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: "#1f2937",
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  signInBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: colors.black,
  },
  signInBtnSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#6b7280",
    marginTop: 2,
  },
  guestBtn: {
    alignItems: "center",
  },
  guestBtnText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: colors.muted,
    textDecorationLine: "underline",
  },
});
