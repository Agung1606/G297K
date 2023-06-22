import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

const TrendingCard = ({ trendingOn, trendingKeywords, numberOfTweets }) => {
  return (
    <StyledPressable className="px-6 py-3 active:bg-gray-300/50">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="font-InterSemiBold text-grayCustom">{trendingOn}</Text>
        <TouchableOpacity>
          <MaterialIcons name="more-vert" size={22} />
        </TouchableOpacity>
      </View>
      <View className="space-y-1">
        <Text className="font-InterSemiBold text-[16px]">
          {trendingKeywords}
        </Text>
        <Text className="font-InterRegular text-grayCustom">
          {numberOfTweets} Tweets
        </Text>
      </View>
    </StyledPressable>
  );
};

export default TrendingCard;
