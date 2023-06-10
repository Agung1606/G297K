import { View, Text } from "react-native";
import React, { useState } from "react";

import Avatar from "./Avatar";
import { styles } from "../../style/Global";

const ProfileInfo = ({
  profileUrl,
  name,
  bio,
  numberOfTweets,
  numberOfFollowers,
  numberOfFollowing,
}) => {
  const info = [
    {
      number: numberOfTweets,
      text: "Tweet",
    },
    {
      number: numberOfFollowers,
      text: "Pengikut",
    },
    {
      number: numberOfFollowing,
      text: "Mengikuti",
    },
  ];

  const [text, setText] = useState(bio?.slice(0, 100));
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    if (!readMore) {
      setText(bio);
      setReadMore(true);
    }
  };
  return (
    <>
      <View className={`flex-row ${styles.flexBetween} space-x-10`}>
        <Avatar imgUrl={profileUrl} size={80} />
        <View className={`flex-1 flex-row ${styles.flexBetween}`}>
          {info.map((item) => (
            <View className={styles.flexCenter} key={item.text}>
              <Text className="font-InterSemiBold text-lg">{item.number}</Text>
              <Text className="font-InterMedium">{item.text}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text className="font-InterBold">{name}</Text>
      <Text className="text-[15px] text-justify">
        {text}
        {bio?.length > 100 && !readMore && (
          <Text onPress={handleReadMore} className="text-gray-600">
            ...more
          </Text>
        )}
      </Text>
    </>
  );
};

export default ProfileInfo;
