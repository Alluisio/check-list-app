import React from "react";
import { Stack } from "expo-router";

const ListStackLayout: React.FC = () => {
  return (
    <Stack initialRouteName="list" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default ListStackLayout;
