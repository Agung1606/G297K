import React from "react";
import {
  View,
  TouchableOpacity,
  Pressable,
  Text,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { styles } from "../style/Global";

const SearchBar = ({ onPress }) => (
  <View
    className={`flex-row ${styles.flexBetween} py-2 px-4 border-b border-gray-600`}
  >
    <TouchableOpacity>
      <SimpleLineIcons name="settings" size={22} />
    </TouchableOpacity>
    <StyledPressable
      onPress={onPress}
      className="flex-1 px-4 py-2 bg-gray-300/80 active:bg-gray-300/50 rounded-full ml-6"
    >
      <Text className="font-InterMedium text-gray-600">Search Account</Text>
    </StyledPressable>
  </View>
);

const TrendingTweets = () => {
  const hardCoded = [
    {
      id: 1,
      trendingOn: "Trending in Indonesia",
      trendingKeywords: "PDIP",
      numberOfTweets: "712K",
    },
    {
      id: 2,
      trendingOn: "Trending in Indonesia",
      trendingKeywords: "Malem Minggu",
      numberOfTweets: "2,642",
    },
    {
      id: 3,
      trendingOn: "Technology - Trending",
      trendingKeywords: "artificial intelligence",
      numberOfTweets: "126K",
    },
    {
      id: 4,
      trendingOn: "Trending in Indonesia",
      trendingKeywords: "Pagi-pagi",
      numberOfTweets: "9,215",
    },
    {
      id: 5,
      trendingOn: "Trending in Indonesia",
      trendingKeywords: "Jokowi",
      numberOfTweets: "11.4K",
    },
  ];

  return (
    <View className="my-2">
      <Text className="mx-4 font-InterBold text-xl">Trends for you</Text>

      <View className="my-2">
        <FlatList
          data={hardCoded}
          renderItem={({ item }) => (
            <StyledPressable className="px-6 py-3 active:bg-gray-300/50">
              <View className={`flex-row ${styles.flexBetween} mb-1`}>
                <Text className="font-InterSemiBold text-grayCustom">
                  {item.trendingOn}
                </Text>
                <TouchableOpacity>
                  <MaterialIcons name="more-vert" size={22} />
                </TouchableOpacity>
              </View>
              <View className="space-y-1">
                <Text className="font-InterSemiBold text-[16px]">
                  {item.trendingKeywords}
                </Text>
                <Text className="font-InterRegular text-grayCustom">
                  {item.numberOfTweets} Tweets
                </Text>
              </View>
            </StyledPressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <TouchableOpacity>
        <Text className="mx-4 text-blue font-InterMedium">Show more</Text>
      </TouchableOpacity>
    </View>
  );
};

const Explore = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <SearchBar onPress={() => navigation.navigate("SearchScreen")} />
      <TrendingTweets />
    </SafeAreaView>
  );
};

export default Explore;
