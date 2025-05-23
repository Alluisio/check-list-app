import Header from "@/components/Header";
import SwipeableInputs from "@/components/SwipeableInputs";
import { ThemedText } from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { v4 } from "uuid";

const screenWidth = Dimensions.get("window").width;

const DEFAULT_GAP = 12;
const INPUT_QTD_WIDTH = 60;
const QTD_WIDTH = INPUT_QTD_WIDTH + 20 + DEFAULT_GAP;
const INPUT_VALUE_WIDTH = 60;
const VALUE_WIDTH = INPUT_VALUE_WIDTH + 20 + DEFAULT_GAP;

const NewListScreen: React.FC = () => {
  const colorScheme = useColorScheme() ?? "light";

  const [titleList, setTitleList] = useState<string>("");

  const [items, setItems] = useState([{ id: v4(), quantity: "", name: "", price: "" }]);

  const addItem = () => {
    setItems((prev) => [...prev, { id: v4(), quantity: "", name: "", price: "" }]);
  };

  const updateItem = (id: string, field: string, value: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <GestureHandlerRootView>
      <Header title="NOVA LISTA" showBackButton />

      <ThemedView style={{ flex: 1, paddingHorizontal: 20 }}>
        <ThemedTextInput placeholder="Titulo da lista" value={titleList} onChangeText={(text) => setTitleList(text)} />

        <ThemedView
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginTop: 24,
            marginBottom: 8,
          }}
        >
          <ThemedText style={{ textAlign: "left", width: QTD_WIDTH }}>Qtd.</ThemedText>
          <ThemedText style={{ width: screenWidth - 3 * DEFAULT_GAP - QTD_WIDTH - VALUE_WIDTH - 60 }}>
            Nome do produto
          </ThemedText>
          <ThemedText style={{ textAlign: "right", width: VALUE_WIDTH }}>Valor</ThemedText>
        </ThemedView>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SwipeableInputs
              key={item.id}
              DEFAULT_GAP={DEFAULT_GAP}
              QTD_WIDTH={QTD_WIDTH}
              VALUE_WIDTH={VALUE_WIDTH}
              item={item}
              onDelete={removeItem}
              onUpdate={updateItem}
            />
          )}
          ListFooterComponent={
            <TouchableOpacity onPress={addItem} style={styles.addNewItemButton}>
              <IconSymbol color={Colors[colorScheme].primaryColor} name="cross" />
              <ThemedText style={{ color: Colors[colorScheme].primaryColor }}>Adicionar mais 1 campo</ThemedText>
            </TouchableOpacity>
          }
        />
      </ThemedView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  header: { flex: 1, fontWeight: "bold" },
  addNewItemButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
  },
});

export default NewListScreen;
