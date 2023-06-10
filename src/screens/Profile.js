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
import { EvilIcons, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";

import { loggedInUser } from "../hooks";
import {
  ProfileInfo,
  ButtonGray,
  TweetCard,
  NoTweets,
  BadgeNotif,
} from "../components";
import { bottomModalConfig } from "../hooks";
import { styles } from "../style/Global";
import { TWEETS } from "../constant";

const BottomMenu = () => {
  const options = [
    {
      title: "Alat Profesional",
      data: [
        {
          text: "G297K untuk Professional",
          icon: <SimpleLineIcons name="rocket" size={18} />,
        },
        {
          text: "Monetisasi",
          icon: <MaterialIcons name="attach-money" size={20} />,
        },
      ],
    },
    {
      title: "Pengaturan & Dukungan",
      data: [
        {
          text: "Pengaturan dan Privasi",
          icon: <SimpleLineIcons name="settings" size={18} />,
        },
        {
          text: "Pusat Bantuan",
          icon: <MaterialIcons name="help-outline" size={20} />,
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
        <TouchableOpacity className="flex-row items-center px-8 pb-2 space-x-2">
          {item.icon}
          <Text className="font-InterMedium">{item.text}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => `basicListEntry-${item.text}`}
    />
  );
};

const Header = ({ username, goToUploadTweet }) => {
  const { bottomSheetModalRef, snapPoints, openModal, renderBackdrop } =
    bottomModalConfig(["30%"]);
  return (
    <>
      <View className={`flex-row ${styles.flexBetween} my-1 px-3`}>
        <Text className="font-InterBold text-xl tracking-wide">{username}</Text>
        <View className={`flex-row items-center space-x-4`}>
          <TouchableOpacity onPress={goToUploadTweet}>
            <EvilIcons name="plus" size={39} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <SimpleLineIcons name="menu" size={28} />
            <BadgeNotif num={1} />
          </TouchableOpacity>
        </View>
      </View>
      {/* bottom modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <BottomMenu />
      </BottomSheetModal>
    </>
  );
};

const Profile = ({ navigation }) => {
  const goToUploadTweet = () => navigation.navigate("UploadTweetScreen");

  const { data } = loggedInUser();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const filter = TWEETS.filter((item) => item.userId === data.id);
    setTweets(filter);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Header username={data.username} goToUploadTweet={goToUploadTweet} />
      <FlatList
        ListHeaderComponent={() => (
          <View className="mb-4 pb-4 border-b border-gray-600">
            <View className="mt-4 px-3">
              <ProfileInfo
                profileUrl={{ uri: data.profile }}
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
                <ButtonGray
                  title={"Ubah profil"}
                  onPress={() => alert("Open edit profile screen!")}
                />
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
    </SafeAreaView>
  );
};

export default Profile;
