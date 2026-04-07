import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import colors from "@/constants/colors";

export default function TabLayout() {
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 2,
          borderTopColor: "#374151",
          height: isWeb ? 84 : 64,
          paddingBottom: isWeb ? 34 : 8,
          paddingTop: 4,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter_700Bold",
          fontSize: 8,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "BREAK ROOM",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="boss"
        options={{
          title: "BOSS",
          tabBarIcon: ({ color }) => (
            <Feather name="alert-triangle" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "LEADERBOARD",
          tabBarIcon: ({ color }) => (
            <Feather name="award" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "SETTINGS",
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
