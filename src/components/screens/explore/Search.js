import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
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

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

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
      {/* wanted user */}
      {users &&
        users.map((user) => (
          <StyledPressable
            onPress={() =>
              navigation.navigate("VisitProfileScreen", { param: user.id })
            }
            key={user.id}
            className="m-2 p-2 flex-row items-center space-x-4 active:bg-gray-200 rounded-lg"
          >
            <Avatar imgUrl={user.profile} size={45} />
            <View>
              <Text className="font-InterBold">{user.name}</Text>
              <Text className="font-InterRegular text-grayCustom">
                @{user.username}
              </Text>
            </View>
          </StyledPressable>
        ))}
    </SafeAreaView>
  );
};

export default Search;
