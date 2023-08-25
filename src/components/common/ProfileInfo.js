import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Avatar from "./Avatar";
import Name from "./Name";
import { changeFormat } from "../../utils";

const ProfileInfo = ({
  user,
  followersCount,
  followingCount,
  tweetsCount,
  openDetailProfile,
}) => {
  const navigation = useNavigation();

  const info = [
    {
      id: 1,
      number: changeFormat(followersCount),
      text: "pengikut",
      onPress: () =>
        navigation.navigate("InfoScreen", {
          text: "Pengikut",
          userId: user.id,
        }),
    },
    {
      id: 2,
      number: changeFormat(followingCount),
      text: "mengikuti",
      onPress: () =>
        navigation.navigate("InfoScreen", {
          text: "Mengikuti",
          userId: user.id,
        }),
    },
    {
      id: 3,
      number: changeFormat(tweetsCount),
      text: "post",
    },
  ];

  return (
    <>
      <View className="mb-1">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="font-LoraBold text-xl">{user.name}</Text>
            <Name text={user.username} />
          </View>
          <Avatar
            imgUrl={user?.profile}
            size={70}
            onPress={openDetailProfile}
          />
        </View>
        <Text className="font-RobotoRegular text-[15px]">{user.bio}</Text>
      </View>
      <FlatList
        data={info}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.onPress}>
            <Text className="font-InterMedium text-grayCustom">
              {`${item.number} ${item.text}`}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        ItemSeparatorComponent={() => <Text className="mx-2 text-grayCustom">•</Text>}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default ProfileInfo;

/*
 return (
    <>
      <View className={`flex-row justify-between items-center space-x-10`}>
        <Avatar imgUrl={user?.profile} size={80} onPress={openDetailProfile} />
        <View className={`flex-1 flex-row justify-between items-center`}>
          {info.map((item) => (
            <Pressable
              className="justify-center items-center"
              onPress={item.onPress}
              key={item.text}
            >
              <Text className="font-InterSemiBold text-lg">{item.number}</Text>
              <Text className="font-InterMedium">{item.text}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Text className="font-InterBold">{user?.name}</Text>
      {user?.bio && (
        <Text className="text-[15px] text-justify">
          {text}
          {user.bio?.length > 100 && !readMore && (
            <Text onPress={handleReadMore} className="text-gray-600">
              ...more
            </Text>
          )}
        </Text>
      )}
    </>
  );
*/
