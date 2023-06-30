import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { modalPopupConfig } from "../../hooks";
import {
  ButtonGray,
  ButtonFollow,
  ProfileInfo,
  TweetCard,
  NoTweets,
  SeeProfileModal,
} from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { onSnapshot, query, where, collection } from "firebase/firestore";

const HeaderVisitProfile = ({ username }) => {
  const navigation = useNavigation();
  const goToPrevScreen = () => navigation.goBack();

  return (
    <View className={`flex-row justify-between items-center my-1 px-3`}>
      <View className={`flex-row justify-between items-center space-x-6`}>
        <TouchableOpacity onPress={goToPrevScreen}>
          <MaterialIcons name="arrow-back" size={30} />
        </TouchableOpacity>
        <Text className="font-InterBold text-lg tracking-wide">{username}</Text>
      </View>
      <View className={`flex-row justify-between items-center space-x-6`}>
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
  const { username, userId } = route?.params?.param;
  const [data, setData] = useState({});
  const [tweets, setTweets] = useState([]);

  useMemo(() => {
    let qUser = query(
      collection(FIREBASE_FIRESTORE, "users"),
      where("username", "==", username)
    );
    onSnapshot(qUser, (res) => {
      setData(
        res.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })[0]
      );
    });

    let qTweets = query(
      collection(FIREBASE_FIRESTORE, "tweets"),
      where("userId", "==", userId)
    );
    onSnapshot(qTweets, (response) => {
      setTweets(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
      );
    });
  }, [username, userId]);

  // this configuration is just for a while
  const [isFollow, setIsFollow] = useState(false);
  const handleFollow = () => setIsFollow(!isFollow);

  const {
    isModalOpen,
    openModal: openDetailProfile,
    closeModal: closeDetailProfile,
  } = modalPopupConfig();

  return (
    <SafeAreaView className="flex-1">
      <HeaderVisitProfile username={data.username} />
      <FlatList
        ListHeaderComponent={() => (
          <View className="my-2 p-2 border-b border-gray-600">
            <ProfileInfo
              profileUrl={data.profile}
              name={data.name}
              bio={data.bio}
              numberOfTweets={tweets.length}
              numberOfFollowers={data.followers}
              numberOfFollowing={data.following}
              openDetailProfile={openDetailProfile}
            />
            {/* button */}
            <View
              className={`flex-row justify-between items-center space-x-2 mt-1`}
            >
              <View className="flex-1">
                <ButtonFollow
                  title={isFollow ? "Mengikuti" : "Ikuti"}
                  isFollow={isFollow}
                  onPress={handleFollow}
                />
              </View>
              <View className="flex-1">
                <ButtonGray title={"Kirim pesan"} />
              </View>
            </View>
          </View>
        )}
        data={tweets}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <NoTweets text="Sepertinya orang ini belum membuat tweet" />
        }
      />
      {/* when user long press the profile this will triggered */}
      <SeeProfileModal
        isModalOpen={isModalOpen}
        closeModal={closeDetailProfile}
        profileUrl={data.profile}
      />
    </SafeAreaView>
  );
};

export default VisitProfile;
