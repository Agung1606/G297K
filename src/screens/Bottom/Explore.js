import React from "react";
import { View, TouchableOpacity, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { TrendingCard } from "../../components";
import { TRENDINGLISTS } from "../../constant";

const SearchBar = ({ onPress }) => (
  <StyledPressable
    onPress={onPress}
    className="my-2 p-2 flex-row items-center space-x-2 bg-gray-300/80 active:bg-gray-300/50 rounded-md"
  >
    <Ionicons name="search-outline" size={22} color={"#7d7d7d"} />
    <Text className="font-InterMedium text-grayCustom">Cari akun</Text>
  </StyledPressable>
);

const Explore = ({ navigation }) => {
  const goToSearchScreen = () => navigation.navigate("SearchAccountScreen");
  const goToTrendingListScreen = () =>
    navigation.navigate("TrendingListScreen");

  return (
    <SafeAreaView className="flex-1 mx-4">
      <Text className="font-InterBold text-2xl">Pencarian</Text>
      <SearchBar onPress={goToSearchScreen} />
    </SafeAreaView>
  );
};

export default Explore;
