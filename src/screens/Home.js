import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import { TWEETS } from "../constant";
import { TweetCard } from "../components";
import { styles } from "../style/Global";
import { EvilIcons } from "@expo/vector-icons";

const Header = () => (
  <View
    className={`flex-row ${styles.flexBetween} py-1 px-3 border-b border-b-gray-600`}
  >
    <Text className="font-LoraBold text-3xl tracking-wider">G297K</Text>
    <View className={`flex-row ${styles.flexBetween} space-x-6`}>
      <TouchableOpacity>
        <EvilIcons name="plus" size={39} />
      </TouchableOpacity>
      <View>
        <TouchableOpacity>
          <EvilIcons name="sc-telegram" size={39} />
          <View className={styles.unreadNotif}>
            <Text className="font-InterSemiBold text-xs">99</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const Home = () => {
  return (
    <SafeAreaView className="flex-1">
      <Header />
      <FlatList
        data={TWEETS}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Home;
