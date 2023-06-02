import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../style/Global";
import { PROFILE, TWEETS } from "../constant";
import { ButtonGray, ButtonFollow, ProfileInfo, TweetCard, NoTweets } from "../components";

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
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const filterProfile = PROFILE.filter((item) => item.id === id);
    const filterTweets = TWEETS.filter((item) => item.userId === id);
    setTweets(filterTweets);
    setData(filterProfile[0]);
  }, [id]);

  const [isFollow, setIsFollow] = useState(false);
  const handleFollow = () => setIsFollow(!isFollow);

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
                numberOfTweets={tweets.length}
                numberOfFollowers={data.followers}
                numberOfFollowing={data.following}
              />
            </View>
            {/* button */}
            <View
              className={`flex-row ${styles.flexBetween} space-x-2 mt-1 px-3`}
            >
              <View className="flex-1">
                <ButtonFollow
                  title={isFollow ? "Following" : "Follow"}
                  isFollow={isFollow}
                  onPress={handleFollow}
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
        data={tweets}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<NoTweets text="It seems that this person have not make a tweet yet" />}
      />
    </SafeAreaView>
  );
};

export default VisitProfile;
