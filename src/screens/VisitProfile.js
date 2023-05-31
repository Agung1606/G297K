import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../style/Global";
import { PROFILE, TWEETS } from "../constant";
import { ButtonGray, ProfileInfo, TweetCard } from "../components";

const Header = ({ username }) => {
  const navigation = useNavigation();
  const goToPrevScreen = () => navigation.goBack();

  return (
    <View className={`flex-row ${styles.flexBetween} my-1 px-3`}>
      <View className={`flex-row ${styles.flexBetween} space-x-6`}>
        <TouchableOpacity onPress={goToPrevScreen}>
          <MaterialIcons name="arrow-back" size={30} />
        </TouchableOpacity>
        <Text className="font-InterBold text-lg tracking-wide">{username}</Text>
      </View>
      <View className={`flex-row ${styles.flexBetween} space-x-6`}>
        <TouchableOpacity>
          <FontAwesome name="bell-o" size={25} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="more-vert" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const VisitProfile = ({ route }) => {
  const id = route?.params?.param;
  const [data, setData] = useState({});

  useEffect(() => {
    const filter = PROFILE.filter((item) => item.id === id);
    setData(filter[0]);
  }, [id]);

  return (
    <SafeAreaView className="flex-1">
      <Header username={data.username} />
      <FlatList
        ListHeaderComponent={() => (
          <View className="mb-4 pb-4 border-b border-gray-600">
            <View className="mt-4 px-3">
              <ProfileInfo
                profileUrl={data.profile}
                name={data.name}
                bio={data.bio}
                numberOfTweets={TWEETS.length}
                numberOfFollowers={data.followers}
                numberOfFollowing={data.following}
              />
            </View>
            {/* button */}
            <View
              className={`flex-row ${styles.flexBetween} space-x-2 mt-1 px-3`}
            >
              <View className="flex-1">
                <ButtonGray
                  title={"Edit profile"}
                  onPress={() => alert("Open edit profile screen!")}
                />
              </View>
              <View className="flex-1">
                <ButtonGray
                  title={"Message"}
                  onPress={() => alert("Message!")}
                />
              </View>
            </View>
          </View>
        )}
        data={TWEETS}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default VisitProfile;
