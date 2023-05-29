import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { Avatar, Interaction } from "../components";
import { COMMENTS } from "../constant";
import { styles } from "../style/Global";

const DetailsTweet = ({ route, navigation }) => {
  const item = route?.params?.param;
  const goToPrevScreen = () => navigation.goBack();

  return (
    <SafeAreaView className="flex-1">
      <View
        className={`flex-row ${styles.flexBetween} p-2 border-b border-b-gray-600`}
      >
        <TouchableOpacity onPress={goToPrevScreen}>
          <MaterialIcons name="arrow-back" size={32} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-InterSemiBold">
          Tweet
        </Text>
      </View>
      <FlatList   
        ListHeaderComponent={<Tweet item={item} />}
        data={COMMENTS}
        renderItem={({ item }) => <Comment item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const Tweet = ({ item }) => (
  <View className="px-3 py-2 mb-2 border-b border-gray-300">
    <View className={`flex-row ${styles.flexBetween} mb-2`}>
      <View className="flex-row items-center space-x-4">
        <Avatar
          imgUrl={item.profile}
          size={50}
          onPress={() => alert("Visit the profile")}
        />
        <View>
          <Text className="font-InterBold">{item.username}</Text>
          <Text className="text-[12px] text-gray-400">{item.date}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <MaterialIcons name="more-vert" size={25} />
      </TouchableOpacity>
    </View>
    {/* tweets */}
    <Text className="font-InterRegular text-[17px]">{item.tweet}</Text>
    <View className="my-4">
      <Interaction
        username={item.username}
        numberOfLikes={item.numberOfLikes}
        numberOfComments={item.numberOfComments}
      />
    </View>
  </View>
);

const Comment = ({ item }) => (
  <View className="my-2 p-2 flex-row space-x-2 border-b border-gray-300/50">
    <Avatar imgUrl={item.profile} size={40} />
    <View className="flex-1">
      <Text className="font-InterRegular">{item.comment}</Text>
      <Text className="font-InterLight text-[10px]">{item.date}</Text>
    </View>
  </View>
);

export default DetailsTweet;
