import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { SearchBar } from "../../components";

const Explore = ({ navigation }) => {
  const goToSearchScreen = () => navigation.navigate("SearchAccountScreen");

  return (
    <SafeAreaView className="flex-1 mx-4">
      <Text className="font-InterBold text-2xl">Pencarian</Text>
      <SearchBar isExplore onPress={goToSearchScreen} />
    </SafeAreaView>
  );
};

export default Explore;
