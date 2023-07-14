import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Avatar } from "../common";
import { formatRelativeTime } from "../../utils";

const CommentCard = ({ item }) => {
  const navigation = useNavigation();
  const goToVisitProfile = () =>
    navigation.navigate("VisitProfileScreen", {
      username: item.username,
      userId: item.userId,
    });

  return (
    <View className="flex-row space-x-2 px-2 py-4 border-b border-gray-300">
      <Avatar imgUrl={item.profile} size={40} onPress={goToVisitProfile} />
      <View className="flex-1">
        {/* username and date */}
        <View className="mb-1 flex-row items-center justify-between">
          <View>
            <Text className="font-InterSemiBold">{item.username}</Text>
            <Text className="text-[10px] font-InterRegular text-gray-400">
              {formatRelativeTime(item.date)}
            </Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={25} />
          </TouchableOpacity>
        </View>
        {/* comment */}
        <Text className="font-RobotoRegular text-[15px]">{item.comment}</Text>
      </View>
    </View>
  );
};

export default CommentCard;
