import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, useColorScheme, ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./ui/IconSymbol";

interface Props extends TextInputProps {
  containerStyle?: ViewStyle;
  showSearchIcon?: boolean;
}

const ThemedTextInput: React.FC<Props> = ({ showSearchIcon, containerStyle, ...rest }) => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      style={[
        styles.container,
        {
          borderColor: Colors[colorScheme ?? "light"].borderColor,
          ...containerStyle,
        },
      ]}
    >
      {showSearchIcon && (
        <IconSymbol name="magnifyingglass" color={Colors[colorScheme ?? "light"].secondaryTextColor} size={18} />
      )}

      <TextInput
        style={{
          ...styles.inputText,
          color: Colors[colorScheme ?? "light"].secondaryTextColor,
        }}
        placeholderTextColor={Colors[colorScheme ?? "light"].secondaryTextColor}
        {...rest}
      ></TextInput>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
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
