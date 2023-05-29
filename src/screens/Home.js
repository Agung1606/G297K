import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import { TWEETSDATA } from "../constant";
import { TweetCard } from "../components";
import { styles } from "../style/Global";
import { EvilIcons } from "@expo/vector-icons";

const Home = () => {
  return (
    <SafeAreaView className="flex-1">
      <View
        className={`flex-row ${styles.flexBetween} py-1 px-2 border-b border-b-gray-600`}
      >
        <Text className="font-LoraBold text-3xl tracking-wider">G297K</Text>
        <View className={`flex-row ${styles.flexBetween} space-x-4`}>
          <TouchableOpacity>
            <EvilIcons name="plus" size={39} />
          </TouchableOpacity>
          <TouchableOpacity>
            <EvilIcons name="sc-telegram" size={39} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={TWEETSDATA}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Home;
