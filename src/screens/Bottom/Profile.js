import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useMemo, useState, useCallback } from "react";

import { modalPopupConfig, scrollToTopConfig } from "../../hooks";
import {
  ProfileInfo,
  ButtonGray,
  ButtonBurgerProfile,
  ButtonScrollToTop,
  TweetCard,
  NoTweets,
  SeeProfileModal,
} from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { query, collection, where, onSnapshot } from "firebase/firestore";

const HeaderProfile = ({ username, goToSettings }) => {
  return (
    <View className={`flex-row justify-between items-center py-2 px-4`}>
      <Text className="font-InterBold text-xl tracking-wide">{username}</Text>
      <ButtonBurgerProfile goToSettings={goToSettings} />
    </View>
  );
};

const Profile = ({ navigation }) => {
  const goToEditProfile = useCallback(() => {
    navigation.navigate("EditProfileScreen");
  }, [navigation]);

  const goToSettings = useCallback(() => {
    navigation.navigate("SettingsScreen");
  }, [navigation]);

  const { isScrolled, reference, handleScroll, scrollToTop } =
    scrollToTopConfig({ kind: "FlatList" });
  const {
    isModalOpen,
    openModal: openDetailProfile,
    closeModal: closeDetailProfile,
  } = modalPopupConfig();

  const loggedInUserData = useSelector((state) => state.global.user);
  const [tweets, setTweets] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useMemo(() => {
    let q = query(
      collection(FIREBASE_FIRESTORE, "tweets"),
      where("userId", "==", loggedInUserData.id)
    );
    onSnapshot(q, (response) => {
      setTweets(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });

    const followersCol = collection(
      FIREBASE_FIRESTORE,
      `users/${loggedInUserData.id}/followers`
    );
    const followingCol = collection(
      FIREBASE_FIRESTORE,
      `users/${loggedInUserData.id}/following`
    );

    onSnapshot(followersCol, (response) => {
      const followers = response.docs.map((doc) => doc.data());
      setFollowersCount(followers.length);
    });

    onSnapshot(followingCol, (response) => {
      const following = response.docs.map((doc) => doc.data());
      setFollowingCount(following.length);
    })
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <HeaderProfile
        goToSettings={goToSettings}
        username={loggedInUserData.username}
      />
      <FlatList
        ref={reference}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        data={tweets}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View className="mb-2 p-2 border-b border-gray-600">
            <ProfileInfo
              profileUrl={loggedInUserData.profile}
              name={loggedInUserData.name}
              bio={loggedInUserData.bio}
              openDetailProfile={openDetailProfile}
              followersCount={followersCount}
              followingCount={followingCount}
              tweetsCount={tweets.length}
            />
            {/* button */}
            <View
              className={`flex-row justify-between items-center space-x-2 mt-1`}
            >
              <View className="flex-1">
                <ButtonGray title={"Edit profil"} onPress={goToEditProfile} />
              </View>
              <View className="flex-1">
                <ButtonGray title={"Bagikan profil"} />
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() => <View className="pb-20" />}
        ListEmptyComponent={
          <NoTweets text="Ketika Anda membuat postingan, itu akan muncul di sini" />
        }
      />
      {isScrolled && (
        <View className="absolute bottom-6 right-2">
          <ButtonScrollToTop onPress={scrollToTop} />
        </View>
      )}
      {/* when user press the profile this will triggered */}
      <SeeProfileModal
        isModalOpen={isModalOpen}
        closeModal={closeDetailProfile}
        profileUrl={loggedInUserData.profile}
      />
    </SafeAreaView>
  );
};

export default Profile;
