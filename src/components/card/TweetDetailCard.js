import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Avatar, TweetInteraction } from "../common";
import { formatRelativeTime } from "../../utils";

const TweetDetailCard = ({
  item,
  goToVisitProfile,
  openBottomModal,
  openModalSendComment,
}) => {
  return (
    <View className="px-3 py-2 mb-2 border-b border-gray-300">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-4">
          <Avatar imgUrl={item.profile} size={50} onPress={goToVisitProfile} />
          <View>
            <View className="flex-row items-center space-x-1">
              <Text className="font-InterBold">{item.name}</Text>
              <Text className="font-InterRegular text-xs text-grayCustom">
                @{item.username}
              </Text>
            </View>
            <Text className="text-[12px] text-grayCustom">
              {formatRelativeTime(item.date)}
            </Text>
          </View>
        </View>
        <Pressable onPress={openBottomModal}>
          <MaterialIcons name="more-vert" size={25} />
        </Pressable>
      </View>
      {/* tweets */}
      <Text className="font-InterRegular text-[17px]">{item.tweet}</Text>
      <View className="my-4">
        <TweetInteraction
          // numberOfLikes={item.numberOfLikes}
          tweetId={item.id}
          numberOfComments={item.numberOfComments}
          openModalSendComment={openModalSendComment}
        />
      </View>
    </View>
  );
};

export default TweetDetailCard;
