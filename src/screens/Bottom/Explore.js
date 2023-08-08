import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
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

  // refresh configuration
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#1D7ED8"]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Explore;
