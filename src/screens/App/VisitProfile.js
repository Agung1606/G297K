import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { useModalPopup } from "../../hooks";
import {
  ButtonGray,
  ButtonFollow,
  ProfileInfo,
  PostCard,
  NoTweets,
  SeeProfileModal,
} from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { collection } from "firebase/firestore";

import {
  getUser,
  getCollectionData,
  followeHandler,
} from "../../services/user";
import { getUserPosts } from "../../services/post";

const HeaderVisitProfile = ({ isMe, goToSettings, goToPrevScreen }) => {
  return (
    <View className={`flex-row justify-between items-center p-2`}>
      <View className="flex-row items-center space-x-6">
        <TouchableOpacity onPress={goToPrevScreen}>
          <MaterialIcons name="arrow-back" size={30} />
        </TouchableOpacity>
      </View>
      {isMe && (
        <TouchableOpacity onPress={goToSettings}>
          <Ionicons name="filter" size={28} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const VisitProfile = ({ route, navigation }) => {
  const { userId } = route?.params;
  const loggedInUserData = useSelector((state) => state.global.user);

  const goToEditProfile = useCallback(() => {
    navigation.navigate("EditProfileScreen");
  }, [navigation]);

  const goToSettings = useCallback(() => {
    navigation.navigate("SettingsScreen");
  }, [navigation]);

  const goToPrevScreen = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [isModalOpen, openDetailProfile, closeDetailProfile] = useModalPopup();

  const [data, setData] = useState({});
  const [dataTweets, setDataTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [myFollower, setMyFollower] = useState(false);
  const [myFollowing, setMyFollowing] = useState(false);

  useEffect(() => {
    (async function () {
      getUser(userId, setData);
      getUserPosts(userId, setDataTweets);

      const followersCol = collection(
        FIREBASE_FIRESTORE,
        `users/${userId}/followers`
      );
      const followingCol = collection(
        FIREBASE_FIRESTORE,
        `users/${userId}/following`
      );

      getCollectionData(
        followersCol,
        setFollowersCount,
        setMyFollowing,
        loggedInUserData.id
      );
      getCollectionData(
        followingCol,
        setFollowingCount,
        setMyFollower,
        loggedInUserData.id
      );
    })();
  }, [userId]);

  return (
    <SafeAreaView className="flex-1">
      <HeaderVisitProfile
        isMe={loggedInUserData.id === userId}
        goToPrevScreen={goToPrevScreen}
        goToSettings={goToSettings}
      />
      <FlatList
        ListHeaderComponent={() => (
          <View className="px-2 py-1 border-b border-gray-600">
            <ProfileInfo
              user={data}
              openDetailProfile={openDetailProfile}
              followersCount={followersCount}
              followingCount={followingCount}
            />
            {/* button */}
            <View
              className={`flex-row justify-between items-center space-x-2 mt-4`}
            >
              {loggedInUserData.id !== userId ? (
                <View className="flex-1">
                  <ButtonFollow
                    loading={loading}
                    title={
                      myFollowing
                        ? "Mengikuti"
                        : !myFollowing && myFollower
                        ? "Ikuti balik"
                        : "Ikuti"
                    }
                    isFollow={myFollowing}
                    onPress={() =>
                      followeHandler(
                        loggedInUserData,
                        data,
                        myFollowing,
                        setLoading
                      )
                    }
                  />
                </View>
              ) : (
                <>
                  <View className="flex-1">
                    <ButtonGray
                      title={"Edit profil"}
                      onPress={goToEditProfile}
                    />
                  </View>
                  <View className="flex-1">
                    <ButtonGray title={"Bagikan profil"} />
                  </View>
                </>
              )}
            </View>
          </View>
        )}
        data={dataTweets}
        renderItem={({ item }) => <PostCard item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <NoTweets text="Sepertinya orang ini belum membuat postingan" />
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
