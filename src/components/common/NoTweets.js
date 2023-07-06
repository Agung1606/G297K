import { View, Text } from "react-native";
import React from "react";

const NoTweets = ({ text }) => {
  return (
    <View className="justify-center items-center mt-10">
      <View className="w-[70%] justify-center items-center">
        <Text className="font-InterSemiBold text-xl text-grayCustom">
          Tidak ada postingan
        </Text>
        <Text className="font-InterRegular text-grayCustom text-center">
          {text}
        </Text>
      </View>
    </View>
  );
};

export default NoTweets;
