import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

const EmptyList: React.FC = () => {
  return <ThemedText style={styles.text}>Não foram encontrado itens</ThemedText>;
};

const styles = StyleSheet.create({
  text: { flex: 1, textAlign: "center" },
});

export default EmptyList;
