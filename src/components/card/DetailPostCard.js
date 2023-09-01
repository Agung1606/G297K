import React from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Avatar, PostInteraction, Name } from "../common";
import { formatRelativeTime } from "../../utils";

const DetailPostCard = ({
  postData,
  goToVisitProfile,
  openBottomModal,
  openModalSendComment,
}) => {
  const loggedInUserId = useSelector((state) => state.global.user.id);

  return (
    <View className="px-3 py-2 border-b border-gray-300">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-4">
          <Avatar
            imgUrl={postData.profile}
            size={50}
            onPress={goToVisitProfile}
          />
          <View>
            <Name text={postData.username} />
            <Text className="text-[12px] text-grayCustom">
              {formatRelativeTime(postData.date)}
            </Text>
          </View>
        </View>
        {loggedInUserId === postData.userId && (
          <TouchableOpacity onPress={openBottomModal}>
            <MaterialIcons name="more-vert" size={25} />
          </TouchableOpacity>
        )}
      </View>
      {/* tweets */}
      <Text className="font-RobotoRegular text-[16px] break-words">{postData.tweet}</Text>
      <View className="my-2">
        <PostInteraction
          tweetId={postData.id}
          openModalSendComment={openModalSendComment}
        />
      </View>
    </View>
  );
};

export default DetailPostCard;
