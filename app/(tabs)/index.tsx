import { StyleSheet } from "react-native";

import Header from "@/components/Header";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedTouchableButton from "@/components/ThemedTouchableButton";
import { ThemedView } from "@/components/ThemedView";
import { useCallback, useState } from "react";

export default function MyListScreen() {
  const [search, setSearch] = useState<string>("");

  const handleChangeSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  return (
    <>
      <Header title="Minhas Listas" />

      <ThemedView style={styles.content}>
        <ThemedView style={styles.filterNewButtonView}>
          <ThemedTextInput value={search} onChangeText={handleChangeSearch} placeholder="Procurar lista" />
          <ThemedTouchableButton label="Nova lista" />
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterNewButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    gap: 12,

    marginBottom: 18,
  },
});
