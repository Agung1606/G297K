import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";

import { TrendingCard } from "../../components";
import { TRENDINGLISTS } from "../../constant";

const Header = ({ goToPrevScreen }) => (
  <View
    className={`flex-row justify-between items-center px-4 py-2 border-b border-gray-600`}
  >
    <View className="flex-row items-center space-x-10">
      <TouchableOpacity onPress={goToPrevScreen}>
        <AntDesign name="arrowleft" size={25} />
      </TouchableOpacity>
      <Text className="font-InterBold text-xl">Trends</Text>
    </View>
    <TouchableOpacity>
      <SimpleLineIcons name="settings" size={22} />
    </TouchableOpacity>
  </View>
);

const TrendingList = ({ navigation }) => {
  const goToPrevScreen = () => navigation.goBack();
  return (
    <SafeAreaView className="flex-1">
      <Header goToPrevScreen={goToPrevScreen} />
      <FlatList
        data={TRENDINGLISTS}
        renderItem={({ item }) => (
          <TrendingCard
            key={item.id}
            trendingOn={item.trendingOn}
            trendingKeywords={item.trendingKeywords}
            numberOfTweets={item.numberOfTweets}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default TrendingList;
