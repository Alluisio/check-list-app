import { FlatList, StyleSheet } from "react-native";

import Header from "@/components/Header";
import SwipeableCard from "@/components/SwipeableCard";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedTouchableButton from "@/components/ThemedTouchableButton";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CARD_ITEM_HEIGHT = 60;

interface MyList {
  id: string;
  title: string;
  total: number;
}

const MyListPage: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleChangeSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const [dados, setDados] = useState<MyList[]>([
    { id: "1", title: "Item 1", total: 5 },
    { id: "2", title: "Item 2", total: 5 },
    { id: "3", title: "Item 3", total: 1 },
  ]);

  const handleDelete = (id: string) => {
    setDados((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenItem = (id: string) => {
    router.push({
      pathname: "/(tabs)/(list)/[id]",
      params: { id },
    });
  };

  const renderItem = useCallback(
    ({ item }: { item: MyList }) => (
      <SwipeableCard item={item} onDelete={() => handleDelete(item.id)} onCardClick={() => handleOpenItem(item.id)} />
    ),
    []
  );

  return (
    <GestureHandlerRootView>
      <Header title="Minhas Listas" />

      <ThemedView style={styles.content}>
        <ThemedView style={styles.filterNewButtonView}>
          <ThemedTextInput value={search} onChangeText={handleChangeSearch} placeholder="Procurar lista" />
          <ThemedTouchableButton label="Nova lista" />
        </ThemedView>

        <FlatList
          data={dados}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          getItemLayout={(_, index) => ({
            length: CARD_ITEM_HEIGHT,
            offset: CARD_ITEM_HEIGHT * index,
            index,
          })}
        />
      </ThemedView>
    </GestureHandlerRootView>
  );
};

export default MyListPage;

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
