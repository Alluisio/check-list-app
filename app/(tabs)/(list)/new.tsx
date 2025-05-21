import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

const NewListScreen: React.FC = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <Header title="NOVA LISTA" showBackButton />
      <ThemedText>This is new screen</ThemedText>
    </ThemedView>
  );
};

export default NewListScreen;
