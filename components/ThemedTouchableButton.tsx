import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./ui/IconSymbol";

interface Props {
  label: string;
  icon?: string;
}

const ThemedTouchableButton: React.FC<Props> = ({ label, icon }) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity>
      <ThemedView
        style={{
          ...styles.container,
          borderColor: Colors[colorScheme ?? "light"].borderColor,
        }}
      >
        <IconSymbol name="cross" color={Colors[colorScheme ?? "light"].secondaryTextColor} size={18} />

        <ThemedText lightColor={Colors.light.secondaryTextColor} darkColor={Colors.dark.secondaryTextColor}>
          {label}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,

    flexDirection: "row",
    alignItems: "center",

    flex: 1,
    gap: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default ThemedTouchableButton;
