import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import { TWEETS } from "../constant";
import { TweetCard, BadgeNotif } from "../components";
import { styles } from "../style/Global";
import { EvilIcons, Fontisto } from "@expo/vector-icons";

const Header = ({ goToMessage }) => (
  <View
    className={`flex-row ${styles.flexBetween} py-1 px-3 border-b border-b-gray-600`}
  >
    <Text className="font-LoraBold text-3xl tracking-wider">G297K</Text>
    <View className={`flex-row ${styles.flexBetween} space-x-4`}>
      <TouchableOpacity>
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
  return (
    <SafeAreaView className="flex-1">
      <Header goToMessage={goToMessage} />
      <FlatList
        data={TWEETS}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Home;
