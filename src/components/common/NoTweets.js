import { View, Text } from "react-native";
import React from "react";

import { styles } from "../../style/Global";

const NoTweets = ({ text }) => {
  return (
    <View className={`${styles.flexCenter} mt-10`}>
      <View className={`w-[70%] ${styles.flexCenter}`}>
        <Text className="font-InterSemiBold text-xl text-grayCustom">
        Tidak ada tweet
        </Text>
        <Text className="font-InterRegular text-grayCustom text-center">{text}</Text>
      </View>
    </View>
  );
};

export default NoTweets;
