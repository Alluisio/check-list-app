import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { ThemedView } from "../ThemedView";
import { IconSymbol } from "../ui/IconSymbol";

interface InEditMode extends Props {
  editMode: true;
  onConfirm: () => void;
  onCancel: () => void;
}

interface NormalMode extends Props {
  editMode?: false;
  onConfirm?: never;
  onCancel?: never;
}

type Props = {
  title: string;
  showBackButton?: boolean;
  editMode?: boolean;
};

const BORDER_RADIUS_HORIZONTAL = 24;

const Header: React.FC<InEditMode | NormalMode> = ({ title, showBackButton, editMode, onCancel, onConfirm }) => {
  const colorScheme = useColorScheme();
  const navigate = useNavigation();

  const handleBackPress = useCallback(() => {
    navigate.goBack();
  }, []);

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <ThemedView
          style={[
            styles.container,
            {
              paddingLeft: showBackButton ? 12 : BORDER_RADIUS_HORIZONTAL,
              paddingTop: insets?.top || 0,
              backgroundColor: colorScheme === "dark" ? Colors.dark.headerBackground : Colors.light.headerBackground,
            },
          ]}
        >
          {showBackButton && (
            <TouchableOpacity onPress={handleBackPress}>
              <IconSymbol name="chevron.left" color="#fff" size={32} style={styles.backIcon} />
            </TouchableOpacity>
          )}

          <Text
            style={[
              styles.title,
              {
                color: colorScheme === "dark" ? Colors.dark.headerColor : Colors.light.headerColor,
                fontWeight: colorScheme === "dark" ? 700 : 400,
              },
            ]}
          >
            {title}
          </Text>

          {editMode && (
            <View style={{ flexDirection: "row", marginLeft: "auto", gap: 12, marginRight: 16 }}>
              <TouchableOpacity onPress={onCancel}>
                <IconSymbol style={{ fontSize: 28 }} color={Colors[colorScheme ?? "dark"].dangerColor} name="escape" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirm}>
                <IconSymbol
                  style={{ fontSize: 28 }}
                  color={Colors[colorScheme ?? "dark"].confirmColor}
                  name="checkmark"
                />
              </TouchableOpacity>
            </View>
          )}
        </ThemedView>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    borderStartEndRadius: BORDER_RADIUS_HORIZONTAL,
    borderEndEndRadius: BORDER_RADIUS_HORIZONTAL,
    paddingBottom: 8,
    paddingLeft: 30,
    paddingRight: 10,

    marginBottom: 12,

    flexDirection: "row",
    alignItems: "center",

    maxHeight: 105,
    minHeight: 105,
  },
  title: {
    textTransform: "uppercase",
    fontFamily: Colors.light.fontFamily,
    fontSize: 20,
  },
  backIcon: {
    paddingRight: 4,
  },
});

export default Header;
