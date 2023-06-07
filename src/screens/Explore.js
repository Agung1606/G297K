import React from "react";
import { View, TouchableOpacity, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons } from "@expo/vector-icons";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { styles } from "../style/Global";

const SearchBar = ({ onPress }) => (
  <StyledPressable
    onPress={onPress}
    className="flex-1 px-4 py-2 bg-gray-300/80 active:bg-gray-300/50 rounded-full ml-6"
  >
    <Text className="font-InterMedium text-gray-600">Search Account</Text>
  </StyledPressable>
);

const Explore = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 mx-4">
      <View className={`flex-row ${styles.flexBetween} p-2`}>
        <TouchableOpacity>
          <SimpleLineIcons name="settings" size={22} />
        </TouchableOpacity>
        <SearchBar onPress={() => navigation.navigate("SearchScreen")} />
      </View>
    </SafeAreaView>
  );
};

export default Explore;