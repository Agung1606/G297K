import { View, Text } from "react-native";
import React from "react";

import { styles } from "../../style/Global";

const NoTweets = ({ text }) => {
  return (
    <View className={`${styles.flexCenter}`}>
      <Text className="font-InterSemiBold text-xl text-grayCustom">
        No tweets
      </Text>
      <Text className="font-InterRegular text-grayCustom">{text}</Text>
    </View>
  );
};

export default NoTweets;
