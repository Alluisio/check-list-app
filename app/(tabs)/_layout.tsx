import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors[colorScheme ?? "light"].bgTabs },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(list)"
        options={{
          title: "MINHAS LISTAS",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "list" : "list"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "SOBRE",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "info" : "info-outline"} color={color} />,
        }}
      />
    </Tabs>
  );
}
