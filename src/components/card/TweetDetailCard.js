import React from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Avatar, TweetInteraction } from "../common";
import { formatRelativeTime } from "../../utils";

const TweetDetailCard = ({
  item,
  goToVisitProfile,
  openBottomModal,
  openModalSendComment,
}) => {
  const loggedInUserId = useSelector((state) => state.global.user.id);

  return (
    <View className="px-3 py-2 border-b border-gray-300">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-4">
          <Avatar imgUrl={item.profile} size={50} onPress={goToVisitProfile} />
          <View>
            <Text className="font-InterBold">{item.username}</Text>
            <Text className="text-[12px] text-grayCustom">
              {formatRelativeTime(item.date)}
            </Text>
          </View>
        </View>
        {loggedInUserId === item.userId && (
          <TouchableOpacity onPress={openBottomModal}>
            <MaterialIcons name="more-vert" size={25} />
          </TouchableOpacity>
        )}
      </View>
      {/* tweets */}
      <Text className="font-RobotoRegular text-[16px]">{item.tweet}</Text>
      <View className="my-2">
        <TweetInteraction
          tweetId={item.id}
          openModalSendComment={openModalSendComment}
        />
      </View>
    </View>
  );
};

export default TweetDetailCard;
