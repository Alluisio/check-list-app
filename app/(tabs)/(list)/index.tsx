import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const List: React.FC = () => {
  return (
    <SafeAreaView>
      <ThemedText>Texdt</ThemedText>
      <Link
        href={{
          pathname: "[id]",
          params: { id: "12" },
        }}
      >
        <Pressable style={{ backgroundColor: "red", height: 80, width: "100%" }}>
          <ThemedText>Id</ThemedText>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
};

export default List;
