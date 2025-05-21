import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useLocalSearchParams } from "expo-router";

const MyListPage: React.FC = () => {
  const { id } = useLocalSearchParams();

  return (
    <ThemedView style={{ flex: 1 }}>
      <Header title="Listagem XXXXXXX" showBackButton />
      <ThemedText>This is id: {id}</ThemedText>
    </ThemedView>
  );
};

export default MyListPage;
