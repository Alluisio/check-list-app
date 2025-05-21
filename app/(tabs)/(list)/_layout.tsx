import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Stack } from "expo-router";
import React from "react";

const ListLayout: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack
      initialRouteName="list"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
      }}
    >
      <Stack.Screen name="list" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="new" />
    </Stack>
  );
};

export default ListLayout;
