import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TweetInteraction = ({
  numsLike,
  isLiked,
  handleLike,
  numberOfComments,
  openModalSendComment,
}) => {
  const options = [
    {
      id: 1,
      icon: isLiked ? (
        <Ionicons name="md-heart-sharp" size={26} color="red" />
      ) : (
        <Ionicons name="md-heart-outline" size={26} />
      ),
      onPress: handleLike,
    },
    {
      id: 2,
      icon: <Ionicons name="chatbubble-outline" size={22} />,
      onPress: openModalSendComment,
    },
  ];

  return (
    <View className="space-y-2">
      <View className="flex-row items-center space-x-5">
        {options.map((item) => (
          <TouchableOpacity key={item.id} onPress={item.onPress}>
            {item.icon}
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-row items-center space-x-5">
        <TouchableOpacity>
          <Text className="font-InterMedium text-grayCustom">
            {numsLike} Suka
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="font-InterMedium text-grayCustom">
            {numberOfComments} Komentar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TweetInteraction;
