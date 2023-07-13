import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

import Avatar from "./Avatar";
import { changeFormat } from "../../utils";

const ProfileInfo = ({
  profileUrl,
  name,
  bio,
  followersCount,
  followingCount,
  tweetsCount,
  openDetailProfile,
}) => {
  const [text, setText] = useState(bio?.slice(0, 100));
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    if (!readMore) {
      setText(bio);
      setReadMore(true);
    }
  };

  const info = [
    {
      number: changeFormat(tweetsCount),
      text: "Post",
    },
    {
      number: changeFormat(followersCount),
      text: "Pengikut",
      onPress: () => console.log("Open followers")
    },
    {
      number: changeFormat(followingCount),
      text: "Mengikuti",
      onPress: () => console.log("Open following")
    },
  ];

  return (
    <>
      <View className={`flex-row justify-between items-center space-x-10`}>
        <Avatar imgUrl={profileUrl} size={80} onPress={openDetailProfile} />
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
      <Text className="font-InterBold">{name}</Text>
      {bio && (
        <Text className="text-[15px] text-justify">
          {text}
          {bio?.length > 100 && !readMore && (
            <Text onPress={handleReadMore} className="text-gray-600">
              ...more
            </Text>
          )}
        </Text>
      )}
    </>
  );
};

export default ProfileInfo;
