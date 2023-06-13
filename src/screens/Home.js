import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import { TWEETS } from "../constant";
import { scrollToTopConfig } from "../hooks";
import { TweetCard, BadgeNotif, ScrollToTop } from "../components";
import { styles } from "../style/Global";
import { EvilIcons, Fontisto } from "@expo/vector-icons";

const Header = ({ goToMessage, goToUploadTweet }) => (
  <View
    className={`flex-row ${styles.flexBetween} py-1 px-3 border-b border-b-gray-600`}
  >
    <Text className="font-LoraBold text-3xl tracking-wider">G297K</Text>
    <View className={`flex-row ${styles.flexBetween} space-x-4`}>
      <TouchableOpacity onPress={goToUploadTweet}>
        <EvilIcons name="plus" size={39} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToMessage}>
        <Fontisto name="email" size={30} />
        <BadgeNotif num={99} />
      </TouchableOpacity>
    </View>
  </View>
);

const Home = ({ navigation }) => {
  const goToMessage = () => navigation.navigate("MessageScreen");
  const goToUploadTweet = () => navigation.navigate("UploadTweetScreen");

  const { isScrolled, reference, handleScroll, scrollToTop } =
    scrollToTopConfig({ kind: "FlatList" });

  return (
    <SafeAreaView className="flex-1">
      <Header goToMessage={goToMessage} goToUploadTweet={goToUploadTweet} />
      <FlatList
        ref={reference}
        onScroll={handleScroll}
        data={TWEETS}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
        initialNumToRender={20}
        showsVerticalScrollIndicator={false}
      />
      {isScrolled && <ScrollToTop onPress={scrollToTop} />}
    </SafeAreaView>
  );
};

export default Home;
