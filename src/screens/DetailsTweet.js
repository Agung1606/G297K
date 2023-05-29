import { View, Text } from "react-native";
import React from "react";

import { Interaction } from "../components";

const DetailsTweet = ({ route }) => {
  const item = route?.params?.param;

  return (
    <View className="flex-1 justify-center items-center">
      <View className="w-full">
        <Interaction
          username={item.username}
          numberOfLikes={item.numberOfLikes}
          numberOfComments={item.numberOfComments}
        />
      </View>
    </View>
  );
};

export default DetailsTweet;
