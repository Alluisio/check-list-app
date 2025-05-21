import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ThemedText } from "../ThemedText";
import { IconSymbol } from "../ui/IconSymbol";

interface ItemCard {
  title: string;
  total: number;
}

interface Props {
  item: ItemCard;
  onDelete: () => void;
  onCardClick: () => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const SwipeableCard: React.FC<Props> = ({ item, onDelete, onCardClick }) => {
  const colorScheme = useColorScheme();

  const translateX = useSharedValue(0);
  const rowHeight = useSharedValue(60);
  const opacity = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-70);
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const animatedRowStyle = useAnimatedStyle(() => ({
    height: rowHeight.value,
    maxHeight: 60,

    marginBottom: 12,
  }));

  const handleDelete = () => {
    opacity.value = withTiming(0, { duration: 200 });
    rowHeight.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) }, (finished) => {
      if (finished) runOnJS(onDelete)();
    });
  };

  return (
    <Animated.View style={[animatedRowStyle]}>
      <View style={styles.actionsContainer}>
        <View
          style={[
            styles.deleteButton,
            { backgroundColor: colorScheme === "dark" ? Colors.dark.dangerColor : Colors.light.dangerColor },
          ]}
        >
          <TouchableOpacity onPress={handleDelete}>
            <IconSymbol name="trash" color={styles.actionText.color} />
          </TouchableOpacity>
        </View>
      </View>

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.card,
            animatedStyle,
            {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cardItemBackground : Colors.light.cardItemBackground,
            },
          ]}
        >
          <TouchableOpacity style={styles.cardButton} onPress={onCardClick}>
            <View style={styles.textView}>
              <ThemedText
                style={[
                  styles.title,
                  {
                    color: colorScheme === "dark" ? Colors.dark.primaryTextColor : Colors.light.primaryTextColor,
                  },
                ]}
              >
                {item.title}
              </ThemedText>
              <ThemedText
                style={[
                  styles.subTitle,
                  {
                    color: colorScheme === "dark" ? Colors.dark.secondaryTextColor : Colors.light.secondaryTextColor,
                  },
                ]}
              >
                {`${item.total} ${item.total != 1 ? "itens" : "item"}`}
              </ThemedText>
            </View>
            <IconSymbol
              color={colorScheme === "dark" ? Colors.dark.secondaryTextColor : Colors.light.secondaryTextColor}
              name="point.3.connected.trianglepath.dotted"
            />
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default SwipeableCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    zIndex: 2,
    minHeight: 60,
    maxHeight: 60,
    justifyContent: "center",
  },
  cardButton: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textView: {
    gap: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 14,
  },
  title: {
    fontSize: 16,
    lineHeight: 16,
  },
  subTitle: {
    fontSize: 14,
    lineHeight: 14,
  },
  actionsContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  deleteButton: {
    padding: 16,
    borderRadius: 10,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
