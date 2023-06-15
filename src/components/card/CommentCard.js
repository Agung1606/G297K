import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";

import { styles } from "../../style/Global";
import { loggedInUser } from "../../hooks";
import { Avatar } from "../common";

const CommentCard = () => {
  // this is just for a while
  const { data: loggedInUserData } = loggedInUser();

  return (
    <View className="p-2 flex-row space-x-2">
      <Avatar imgUrl={{ uri: loggedInUserData.profile }} size={40} />
      <View className="flex-1">
        <View className="bg-gray-200/70 rounded-md p-2">
          <View className={`flex-row ${styles.flexBetween}`}>
            <Text className="font-InterSemiBold">{loggedInUserData.name}</Text>
            <TouchableOpacity>
              <MaterialIcons name="more-vert" size={20} />
            </TouchableOpacity>
          </View>
          <Text className="font-InterLight text-grayCustom">1 jam</Text>
          <Text className="font-InterRegular mt-2">Lord pain 🔥🔥🔥</Text>
        </View>
        {/* interaction */}
        <CommentInteraction />
      </View>
    </View>
  );
};

const CommentInteraction = () => {
  const options = [
    {
      name: "like",
      num: 297,
      icon: <SimpleLineIcons name="like" size={18} />,
      onPress: () => {},
    },
    {
      name: "dislike",
      num: 0,
      icon: <SimpleLineIcons name="dislike" size={18} />,
      onPress: () => {},
    },
  ];
  return (
    <View className="m-2 flex-row items-center space-x-10">
      {options.map((item) => (
        <View key={item.name} className="flex-row items-center space-x-2">
          <TouchableOpacity>{item.icon}</TouchableOpacity>
          {item.num && <Text className="font-InterRegular">{item.num}</Text>}
        </View>
      ))}
    </View>
  );
};

export default CommentCard;
