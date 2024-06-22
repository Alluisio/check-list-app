import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalSearchParams } from "expo-router";

const MyList: React.FC = () => {
  const globalParams = useGlobalSearchParams();

  return (
    <SafeAreaView>
      <ThemedText>My list {globalParams.id} </ThemedText>
    </SafeAreaView>
  );
};

export default MyList;
