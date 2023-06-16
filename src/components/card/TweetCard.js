import {
  View,
  Text,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Avatar, TweetInteraction } from "../common";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

/* React.memo is a handy tool to optimize functional components in React by 
reducing unnecessary re-renders. It's especially useful when dealing with 
components that receive props that don't change frequently or are expensive 
to compute. */

const TweetCard = React.memo(({ item }) => {
  const navigation = useNavigation();
  const goToDetails = () =>
    navigation.navigate("DetailsTweetScreen", { param: item });
  const goToVisitProfile = () =>
    navigation.navigate("VisitProfileScreen", { param: item.userId });
  const openModalSendComment = () =>
    navigation.navigate("SendComment", { param: { name: item.name } });

  return (
    <StyledPressable
      onPress={goToDetails}
      className="flex-row space-x-2 active:bg-gray-600/30 p-2 border-b border-gray-300"
    >
      {/* profile */}
      <View>
        <Avatar imgUrl={item.profile} size={50} onPress={goToVisitProfile} />
      </View>
      {/* wrapper */}
      <View className="flex-1">
        {/* username and date */}
        <View className="mb-1">
          <View className="flex-row items-center space-x-1">
            <Text className="font-InterBold">{item.name}</Text>
            <Text className="font-InterRegular text-xs text-grayCustom">
              @{item.username}
            </Text>
          </View>
          <Text className="text-[12px] text-gray-400">{item.date}</Text>
        </View>
        {/* tweets, Note: this is a little bit tricky code */}
        <Text className="mb-2">
          <Text className="font-InterRegular">{item.tweet.slice(0, 550)}</Text>
          {item.tweet.length > 550 && (
            <Text className="text-blue font-InterSemiBold">
              ...Baca Lebih Lanjut
            </Text>
          )}
        </Text>
        {/* like, comment, and share */}
        <TweetInteraction
          numberOfLikes={item.numberOfLikes}
          numberOfComments={item.numberOfComments}
          openModalSendComment={openModalSendComment}
        />
      </View>
    </StyledPressable>
  );
});

export default TweetCard;
