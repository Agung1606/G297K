import React from "react";
import { View, TouchableOpacity, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons } from "@expo/vector-icons";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { TrendingCard } from "../../components";
import { TRENDINGLISTS } from "../../constant";

const SearchBar = ({ onPress }) => (
  <View
    className={`flex-row justify-between items-center py-2 px-4 border-b border-gray-600`}
  >
    <TouchableOpacity>
      <SimpleLineIcons name="settings" size={22} />
    </TouchableOpacity>
    <StyledPressable
      onPress={onPress}
      className="flex-1 px-4 py-2 bg-gray-300/80 active:bg-gray-300/50 rounded-full ml-6"
    >
      <Text className="font-InterMedium text-gray-600">Cari akun</Text>
    </StyledPressable>
  </View>
);

const Explore = ({ navigation }) => {
  const goToSearchScreen = () => navigation.navigate("SearchAccountScreen");
  const goToTrendingListScreen = () =>
    navigation.navigate("TrendingListScreen");

  return (
    <SafeAreaView className="flex-1">
      <SearchBar onPress={goToSearchScreen} />
      <View className="my-2 pb-8">
        <Text className="mx-4 font-InterBold text-xl">Trending untuk Anda</Text>

        <View className="my-2">
          {/* only take the first 5 off list */}
          {TRENDINGLISTS.slice(0, 5).map((item) => (
            <TrendingCard
              key={item.id}
              trendingOn={item.trendingOn}
              trendingKeywords={item.trendingKeywords}
              numberOfTweets={item.numberOfTweets}
            />
          ))}
        </View>

        <TouchableOpacity onPress={goToTrendingListScreen}>
          <Text className="mx-4 text-blue font-InterMedium">
            Tampilkan lebih banyak
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Explore;
