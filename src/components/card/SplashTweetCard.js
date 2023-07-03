import { View, Text } from "react-native";
import React from "react";

const SplashTweetCard = () => {
  return (
    <View className="flex-row space-x-2 p-2">
      {/* profile */}
      <View className="bg-gray-300 w-12 h-12 rounded-full" />
      {/* wrapper */}
      <View className="flex-1">
        {/* username and date */}
        <View className="mb-1">
          <View className="flex-row items-center space-x-1 mb-1">
            <View className="bg-gray-300 w-20 py-2 rounded-sm" />
            <View className="bg-gray-300 w-16 py-2 rounded-sm" />
          </View>
          <View className="bg-gray-300 w-14 py-[5px] rounded-sm" />
        </View>
        <View className="bg-gray-300 w-full h-48 rounded-sm" />
      </View>
    </View>
  );
};

export default SplashTweetCard;
