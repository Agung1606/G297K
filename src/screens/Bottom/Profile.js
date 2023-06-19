import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";

import { loggedInUser, modalPopupConfig } from "../../hooks";
import {
  ProfileInfo,
  ButtonGray,
  TweetCard,
  NoTweets,
  BadgeNotif,
  SeeProfileModal,
} from "../../components";
import { bottomModalConfig } from "../../hooks";
import { styles } from "../../style/Global";
import { TWEETS } from "../../constant";

const HeaderProfile = ({ username, goToSettings }) => {
  const {
    bottomSheetModalRef,
    snapPoints,
    openModal,
    closeModal,
    renderBackdrop,
  } = bottomModalConfig(["30%"]);
  return (
    <>
      <View className={`flex-row ${styles.flexBetween} py-2 px-4`}>
        <Text className="font-InterBold text-xl tracking-wide">{username}</Text>
        <TouchableOpacity onPress={openModal}>
          <SimpleLineIcons name="menu" size={28} />
          <BadgeNotif num={1} />
        </TouchableOpacity>
      </View>
      {/* bottom modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <BottomMenu goToSettings={goToSettings} closeModal={closeModal} />
      </BottomSheetModal>
    </>
  );
};

const BottomMenu = ({ goToSettings, closeModal }) => {
  const options = [
    {
      title: "Alat Profesional",
      data: [
        {
          text: "G297K untuk Professional",
          icon: <SimpleLineIcons name="rocket" size={18} />,
          onPress: () => {},
        },
        {
          text: "Monetisasi",
          icon: <MaterialIcons name="attach-money" size={20} />,
          onPress: () => {},
        },
      ],
    },
    {
      title: "Pengaturan & Dukungan",
      data: [
        {
          text: "Pengaturan dan Privasi",
          icon: <SimpleLineIcons name="settings" size={18} />,
          onPress: () => {
            goToSettings();
            closeModal();
          },
        },
        {
          text: "Pusat Bantuan",
          icon: <MaterialIcons name="help-outline" size={20} />,
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <SectionList
      sections={options}
      renderSectionHeader={({ section }) => (
        <Text className="px-6 py-2 font-InterSemiBold text-lg">
          {section.title}
        </Text>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={item.onPress}
          className="flex-row items-center px-8 pb-2 space-x-2"
        >
          {item.icon}
          <Text className="font-InterMedium">{item.text}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => `basicListEntry-${item.text}`}
    />
  );
};

const Profile = ({ navigation }) => {
  const goToEditProfile = () => navigation.navigate("EditProfileScreen");
  const goToSettings = () => navigation.navigate("SettingsScreen");

  const { data } = loggedInUser();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const filter = TWEETS.filter((item) => item.userId === data.id);
    setTweets(filter);
  }, []);

  const {
    isModalOpen,
    openModal: openDetailProfile,
    closeModal: closeDetailProfile,
  } = modalPopupConfig();

  return (
    <SafeAreaView className="flex-1">
      <HeaderProfile goToSettings={goToSettings} username={data.username} />
      <FlatList
        ListHeaderComponent={() => (
          <View className="my-2 p-2 border-b border-gray-600">
            <ProfileInfo
              profileUrl={{ uri: data.profile }}
              name={data.name}
              bio={data.bio}
              numberOfTweets={tweets.length}
              numberOfFollowers={data.followers}
              numberOfFollowing={data.following}
              openDetailProfile={openDetailProfile}
            />
            {/* button */}
            <View className={`flex-row ${styles.flexBetween} space-x-2 mt-1`}>
              <View className="flex-1">
                <ButtonGray title={"Edit profil"} onPress={goToEditProfile} />
              </View>
              <View className="flex-1">
                <ButtonGray
                  title={"Bagikan profil"}
                  onPress={() => alert("Share profile!")}
                />
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
        profileUrl={{ uri: data.profile }}
      />
    </SafeAreaView>
  );
};

export default Profile;
