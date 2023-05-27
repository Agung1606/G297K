import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import Avatar from "../Avatar";
import { styles } from "../../style/Global";
import { assets, tweet } from "../../constant";
import { Interaction } from '../SubInfo'

const TweetCard = () => {
  const [text, setText] = useState(tweet.slice(0, 550))
  const [readMore, setReadMore] = useState(false)
  const handleReadMore = () => {
    if(!readMore) {
      setText(tweet)
      setReadMore(true)
    } else {
      setText(tweet.slice(0, 550))
      setReadMore(false)
    }
  };

  return (
    <View className="px-3 py-2 mb-2 border-b border-gray-300">
      {/* container */}
      <View className="flex-row space-x-2">
        {/* profile */}
        <Avatar imgUrl={assets.luffyProfile} size={50} />
        {/* wrapper */}
        <View className="flex-1">
          {/* username and date */}
          <View className={`flex-row ${styles.flexBetween} mb-1`}>
            <View>
              <Text className="font-InterBold">agung saputra</Text>
              <Text className="text-[12px] text-gray-400">16 menit</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="more-vert" size={25} />
            </TouchableOpacity>
          </View>
          {/* tweets */}
          <Text className={`font-InterRegular mb-3`}>
            {text}
            {!readMore && "..."}
            <Text
              onPress={handleReadMore}
              className="text-blue font-InterSemiBold"
            >
              {readMore ? " Show Less" : " Read More"}
            </Text>
          </Text>
          {/* like, comment, and share */}
          <Interaction />
        </View>
      </View>
    </View>
  );
};

export default TweetCard;
