import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SearchBar, SearchUserCard } from "../../components";

import { getUsers } from "../../services/user";

const Explore = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const goToSearchScreen = () => navigation.navigate("SearchAccountScreen");
  const goToProfile = (item) => {
    navigation.navigate("VisitProfileScreen", {
      username: item.username,
      userId: item.id,
    });
  };

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <SafeAreaView className="flex-1 mx-4">
      <View>
        <Text className="font-InterBold text-2xl">Pencarian</Text>
        <SearchBar isExplore onPress={goToSearchScreen} />
      </View>
      {users.length === 0 ? (
        <ActivityIndicator size={"large"} color={"#1D7ED8"} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SearchUserCard
              onPress={() => goToProfile(item)}
              imgUrl={item.profile}
              name={item.name}
              username={item.username}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Explore;
