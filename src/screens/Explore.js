import React from "react";
import { View, TouchableOpacity, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons } from "@expo/vector-icons";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { styles } from "../style/Global";

const SearchBar = ({ onPress }) => (
  <View
    className={`flex-row ${styles.flexBetween} py-2 px-4 border-b border-gray-600`}
  >
    <TouchableOpacity>
      <SimpleLineIcons name="settings" size={22} />
    </TouchableOpacity>
    <StyledPressable
      onPress={onPress}
      className="flex-1 px-4 py-2 bg-gray-300/80 active:bg-gray-300/50 rounded-full ml-6"
    >
      <Text className="font-InterMedium text-gray-600">Search Account</Text>
    </StyledPressable>
  </View>
);

const Explore = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <SearchBar onPress={() => navigation.navigate("SearchScreen")} />
    </SafeAreaView>
  );
};

export default Explore;
