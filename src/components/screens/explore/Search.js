import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { styles } from "../../../style/Global";
import { PROFILE } from "../../../constant";
import { Avatar } from "../../common";

const SearchBar = ({ goBack, query, setQuery }) => (
  <View
    className={`flex-row ${styles.flexBetween} py-2 px-4 border-b border-gray-600`}
  >
    <TouchableOpacity onPress={goBack}>
      <AntDesign name="arrowleft" size={22} />
    </TouchableOpacity>
    <View className="flex-1 px-4 py-2 ml-6">
      <TextInput
        placeholder="Search Account"
        className="font-InterMedium text-gray-600"
        autoFocus={true}
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
    </View>
  </View>
);

const Search = ({ navigation }) => {
  const goBack = () => navigation.goBack();
  const goToProfile = (item) => {
    navigation.navigate("VisitProfileScreen", { param: item.id });
    handleHistory(item);
  };

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);

  const handleHistory = (item) => {
    const isUserAlreadyExist = history.some((user) => user.id === item.id);
    if (!isUserAlreadyExist) {
      setHistory([item, ...history]);
    }
  };

  useEffect(() => {
    if (query) {
      const filtered = PROFILE.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setUsers(filtered);
    }

    return () => setUsers([]);
  }, [query]);

  return (
    <SafeAreaView className="flex-1">
      <SearchBar goBack={goBack} query={query} setQuery={setQuery} />
      {users && query ? (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <StyledPressable
              onPress={() => goToProfile(item)}
              key={item.id}
              className="m-2 p-2 flex-row items-center space-x-4 active:bg-gray-200 rounded-lg"
            >
              <Avatar imgUrl={item.profile} size={45} />
              <View>
                <Text className="font-InterBold">{item.name}</Text>
                <Text className="font-InterRegular text-grayCustom">
                  @{item.username}
                </Text>
              </View>
            </StyledPressable>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View className="mt-6">
          <FlatList
            data={history}
            renderItem={({ item }) => (
              <StyledPressable
                onPress={() => goToProfile(item)}
                key={item.id}
                className="mr-6 items-center active:bg-gray-200 rounded-lg"
              >
                <Avatar
                  imgUrl={item.profile}
                  size={40}
                  onPress={() => goToProfile(item)}
                />
                <View className="items-center">
                  <Text className="font-InterMedium">{item.name}</Text>
                  <Text className="font-InterRegular text-grayCustom">
                    @{item.username}
                  </Text>
                </View>
              </StyledPressable>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => (
              <Text className="mt-6 font-InterSemiBold text-gray-600">
                Try searching for people
              </Text>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;
