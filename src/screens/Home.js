import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

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

  const [isScrolled, setIsScrolled] = useState(false);
  const flatListRef = React.useRef(null);
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 0);
  };
  const scrollToTop = () =>
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });

  return (
    <SafeAreaView className="flex-1">
      <Header goToMessage={goToMessage} />
      <FlatList
        ref={flatListRef}
        onScroll={handleScroll}
        data={TWEETS}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
      />
      {isScrolled && (
        <TouchableOpacity
          onPress={scrollToTop}
          className="absolute bottom-6 right-2 bg-blue rounded-full p-2"
        >
          <AntDesign name="arrowup" size={24} color={"white"} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Home;
