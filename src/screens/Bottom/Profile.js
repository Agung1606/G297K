import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";

import { modalPopupConfig } from "../../hooks";
import {
  ProfileInfo,
  ButtonGray,
  ButtonBurgerProfile,
  TweetCard,
  NoTweets,
  SeeProfileModal,
} from "../../components";
import { TWEETS } from "../../constant";

const HeaderProfile = ({ username, goToSettings }) => {
  return (
    <View className={`flex-row justify-between items-center py-2 px-4`}>
      <Text className="font-InterBold text-xl tracking-wide">{username}</Text>
      <ButtonBurgerProfile goToSettings={goToSettings} />
    </View>
  );
};

const Profile = ({ navigation }) => {
  const goToEditProfile = () => navigation.navigate("EditProfileScreen");
  const goToSettings = () => navigation.navigate("SettingsScreen");

  const loggedInUserData = useSelector((state) => state.global.user);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const filter = TWEETS.filter((item) => item.userId === loggedInUserData.id);
    setTweets(filter);
  }, []);

  const {
    isModalOpen,
    openModal: openDetailProfile,
    closeModal: closeDetailProfile,
  } = modalPopupConfig();

  return (
    <SafeAreaView className="flex-1">
      <HeaderProfile
        goToSettings={goToSettings}
        username={loggedInUserData.username}
      />
      <FlatList
        ListHeaderComponent={() => (
          <View className="my-2 p-2 border-b border-gray-600">
            <ProfileInfo
              profileUrl={loggedInUserData.profile}
              name={loggedInUserData.name}
              bio={loggedInUserData.bio}
              numberOfTweets={tweets.length}
              numberOfFollowers={loggedInUserData.followers}
              numberOfFollowing={loggedInUserData.following}
              openDetailProfile={openDetailProfile}
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
        data={tweets}
        renderItem={({ item }) => <TweetCard item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <NoTweets text="Ketika Anda membuat tweet, itu akan muncul di sini" />
        }
      />
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
