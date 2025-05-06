import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, useColorScheme } from "react-native";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./ui/IconSymbol";

interface Props extends TextInputProps {
  icon?: string;
}

const ThemedTextInput: React.FC<Props> = ({ icon, ...rest }) => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      style={{
        ...styles.container,
        borderColor: Colors[colorScheme ?? "light"].borderColor,
      }}
    >
      <IconSymbol name="magnifyingglass" color={Colors[colorScheme ?? "light"].secondaryTextColor} size={18} />
      <TextInput
        {...rest}
        style={{
          ...styles.inputText,
          color: Colors[colorScheme ?? "light"].secondaryTextColor,
        }}
        placeholderTextColor={Colors[colorScheme ?? "light"].secondaryTextColor}
      ></TextInput>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 8,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 8,
    overflow: "hidden",
  },
  inputText: {
    flex: 1,
    width: "100%",
    paddingRight: 12,
    fontSize: 16,
  },
});

export default ThemedTextInput;
