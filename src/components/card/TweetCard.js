import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Avatar, TweetInteraction } from "../common";
import { formatRelativeTime } from "../../utils";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

const TweetCard = ({ item }) => {
  const navigation = useNavigation();

  const goToDetails = useCallback(() => {
    navigation.navigate("DetailsTweetScreen", { param: item });
  }, [navigation, item]);

  const goToVisitProfile = useCallback(() => {
    navigation.navigate("VisitProfileScreen", {
      param: { username: item.username, userId: item.userId },
    });
  }, [navigation, item]);

  const openModalSendComment = useCallback(() => {
    navigation.navigate("SendComment", { param: item });
  }, [navigation, item]);

  return (
    <StyledPressable
      onPress={goToDetails}
      className="flex-row space-x-2 active:bg-grayCustom/10 p-2 border-b border-gray-300"
    >
      {/* profile */}
      <View>
        <Avatar imgUrl={item.profile} size={50} onPress={goToVisitProfile} />
      </View>
      {/* wrapper */}
      <View className="flex-1">
        {/* username and date */}
        <View className="mb-1">
          <Text className="font-InterBold">{item.username}</Text>
          <Text className="text-[12px] text-gray-400">
            {formatRelativeTime(item.date)}
          </Text>
        </View>
        {/* tweets, Note: this is a little bit tricky code */}
        <Text className="mb-2">
          <Text className="font-RobotoRegular text-[15px]">
            {item.tweet.slice(0, 550)}
          </Text>
          {item.tweet.length > 550 && (
            <Text className="text-blue font-RobotoRegular text-[15px]">
              ...Baca Lebih Lanjut
            </Text>
          )}
        </Text>
        {/* like, comment, and share */}
        <TweetInteraction
          tweetId={item.id}
          numberOfComments={item.numberOfComments}
          openModalSendComment={openModalSendComment}
        />
      </View>
    </StyledPressable>
  );
};

export default React.memo(TweetCard);
