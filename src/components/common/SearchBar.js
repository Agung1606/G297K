import { Text, Pressable, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

const SearchBar = ({ isExplore, onPress, goBack, searchQuery, setSearchQuery }) => {
  return isExplore ? (
    <StyledPressable
      onPress={onPress}
      className="my-2 p-2 flex-row items-center space-x-2 bg-gray-300/80 active:bg-gray-300/50 rounded-md"
    >
      <Ionicons name="search-outline" size={22} color={"#7d7d7d"} />
      <Text className="font-InterMedium text-grayCustom">Cari akun</Text>
    </StyledPressable>
  ) : (
    <View className="my-2 flex-row items-center space-x-2">
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="arrow-back" size={25} />
      </TouchableOpacity>
      <View className="p-2 flex-1 flex-row items-center space-x-2 bg-gray-300/80 rounded-md">
        <Ionicons name="search-outline" size={22} color={"#7d7d7d"} />
        <TextInput
          placeholder="Cari akun"
          placeholderTextColor={"#7d7d7d"}
          className="flex-1 font-InterMedium"
          autoFocus={true}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
    </View>
  );
};

export default SearchBar;
