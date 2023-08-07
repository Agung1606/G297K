import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SearchBar, SearchUserCard } from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

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
    const getUsers = async () => {
      let collectionRef = collection(FIREBASE_FIRESTORE, "users");

      const unsubscribe = onSnapshot(
        collectionRef,
        (response) => {
          const users = response.docs.map((doc) => ({
            id: doc.id,
            username: doc.data().username,
            name: doc.data().name,
            profile: doc.data().profile,
          }));
          setUsers(users);
        },
        (error) => {
          console.log("Error fetching users: ", error);
        }
      );

      return () => unsubscribe();
    };

    getUsers();
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
