import { FlatList, StyleSheet } from "react-native";

import Header from "@/components/Header";
import SwipeableCard from "@/components/SwipeableCard";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedTouchableButton from "@/components/ThemedTouchableButton";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import EmptyList from "@/components/EmptyList";
import { deleteList, getAllLists } from "@/lib/storage";

const CARD_ITEM_HEIGHT = 60;

interface MyList {
  id: string;
  title: string;
  total: number;
}

const MyListPage: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const [dados, setDados] = useState<MyList[]>([]);

  useEffect(() => {
    (async () => {
      // await setupDatabase();
      // await loadList();
      setDados([
        {
          id: "1",
          title: "fake list",
          total: 5,
        },
      ]);
    })();
  }, []);

  async function loadList() {
    try {
      const data = await getAllLists();

      setDados(data);
    } catch (e) {
      console.error("Erro ao carregar itens:", e);
    }
  }

  const handleChangeSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const handleDelete = (id: string) => {
    new Promise(async (resolve) => {
      resolve(await deleteList(id));
    }).then(() => {
      loadList();
    });
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

  const handleNewListPress = () => {
    router.push("/new");
  };

  return (
    <GestureHandlerRootView>
      <Header title="Minhas Listas" />

      <ThemedView style={styles.content}>
        <ThemedView style={styles.filterNewButtonView}>
          <ThemedTextInput
            showSearchIcon
            containerStyle={{ flex: 1 }}
            style={styles.filterInput}
            value={search}
            onChangeText={handleChangeSearch}
            placeholder="Procurar lista"
          />
          <ThemedTouchableButton label="Nova lista" onPress={handleNewListPress} />
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
          ListEmptyComponent={EmptyList}
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
  filterInput: {
    flex: 1,
  },
});
