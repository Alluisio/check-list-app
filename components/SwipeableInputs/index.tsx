import { Colors } from "@/constants/Colors";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import ThemedTextInput from "../ThemedTextInput";
import { IconSymbol } from "../ui/IconSymbol";

const screenWidth = Dimensions.get("window").width;

interface Props {
  item: any;
  onDelete: (id: string) => void;
  onUpdate: (id: string, field: string, value: string) => void;
  QTD_WIDTH: number;
  DEFAULT_GAP: number;
  VALUE_WIDTH: number;
}

const SwipeableInputs: React.FC<Props> = ({ item, onDelete, onUpdate, DEFAULT_GAP, QTD_WIDTH, VALUE_WIDTH }) => {
  const colorScheme = useColorScheme();

  const translateX = useSharedValue(0);
  const maxSwipe = -80;

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value < maxSwipe) {
        translateX.value = withTiming(maxSwipe);
      } else {
        if (translateX.value < maxSwipe) {
          translateX.value = withTiming(-70);
        } else {
          translateX.value = withTiming(0);
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Botão de fundo (excluir) */}
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <IconSymbol color={Colors[colorScheme ?? "dark"].dangerColor} name="trash" />
        </TouchableOpacity>
      </View>

      {/* Card por cima */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.inputRow, animatedStyle]}>
          <ThemedTextInput
            containerStyle={{
              width: QTD_WIDTH - DEFAULT_GAP,
            }}
            style={[
              {
                color: Colors[colorScheme ?? "dark"].primaryTextColor,
              },
            ]}
            value={item.quantity}
            onChangeText={(text) => onUpdate(item.id, "quantity", text)}
            placeholder="0 itens"
            keyboardType="numeric"
          />
          <ThemedTextInput
            containerStyle={{
              width: screenWidth - 2 * DEFAULT_GAP - QTD_WIDTH - VALUE_WIDTH - 20,
            }}
            style={[
              {
                color: Colors[colorScheme ?? "dark"].primaryTextColor,
              },
            ]}
            value={item.name}
            onChangeText={(text) => onUpdate(item.id, "name", text)}
            placeholder="Nome do produto"
          />
          <ThemedTextInput
            containerStyle={{
              width: VALUE_WIDTH,
            }}
            style={[
              {
                color: Colors[colorScheme ?? "dark"].primaryTextColor,
              },
            ]}
            value={item.price}
            onChangeText={(text) => onUpdate(item.id, "price", text)}
            placeholder="R$ 0,00"
            keyboardType="decimal-pad"
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  deleteButtonContainer: {
    // backgroundColor: "red",
    height: "100%",
    width: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
    elevation: 2,
  },
});

export default SwipeableInputs;
