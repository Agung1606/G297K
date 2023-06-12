import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "../style/Global";
import { TweetDetailCard, CommentCard } from "../components";

const DetailsTweet = ({ route, navigation }) => {
  const item = route?.params?.param;
  const goToPrevScreen = () => navigation.goBack();
  const goToVisitProfile = () =>
    navigation.navigate("VisitProfileScreen", { param: item.userId });

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
      {/* this configuration is just for a while */}
      <FlatList
        ListHeaderComponent={
          <TweetDetailCard item={item} goToVisitProfile={goToVisitProfile} />
        }
        ListFooterComponent={<CommentCard />}
      />
    </SafeAreaView>
  );
};

export default DetailsTweet;
