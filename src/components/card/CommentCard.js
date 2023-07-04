import { View, Text, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Avatar, CommentInteraction } from "../common";

const CommentCard = ({ item }) => {
  const navigation = useNavigation();
  const goToVisitProfile = () =>
    navigation.navigate("VisitProfileScreen", {
      param: { username: item.username, userId: item.userId },
    });

  return (
    <View className="p-2 flex-row space-x-2">
      <Avatar imgUrl={item.profile} size={40} onPress={goToVisitProfile} />
      <View className="flex-1">
        <View className="bg-gray-200/70 rounded-md p-2">
          <View className="flex-row justify-between items-center">
            <Text className="font-InterSemiBold">{item.name}</Text>
            <Pressable>
              <MaterialIcons name="more-vert" size={20} />
            </Pressable>
          </View>
          <Text className="font-InterLight text-grayCustom">{item.date}</Text>
          <Text className="font-InterRegular mt-2">{item.comment}</Text>
        </View>
        <CommentInteraction numberOfLikes={item.numberOfLikes} />
      </View>
    </View>
  );
};

export default CommentCard;
