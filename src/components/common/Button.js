import React from "react";
import {
  Text,
  ActivityIndicator,
  Pressable,
  View,
  SectionList,
  TouchableOpacity,
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useSelector } from "react-redux";

import { styles } from "../../style/Global";
import { bottomModalConfig } from "../../hooks";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

export const ButtonSettingTweetCard = ({ userId, tweetId }) => {
  const {
    bottomSheetModalRef,
    snapPoints,
    openModal,
    closeModal,
    renderBackdrop,
  } = bottomModalConfig(["10%"]);
  const loggedInUserId = useSelector((state) => state.global.user.id);

  const options = [
    {
      icon:
        loggedInUserId === userId ? (
          <Ionicons name="trash-outline" size={30} color={"#7d7d7d"} />
        ) : (
          <MaterialIcons name="report" size={30} color={"#7d7d7d"} />
        ),
      text: loggedInUserId === userId ? "Hapus" : "Laporkan tweet ini",
      onPress: () => {},
    },
  ];

  return (
    <>
      <TouchableOpacity onPress={openModal}>
        <MaterialIcons name="more-vert" size={25} />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <View className="px-6 space-y-3">
          {options.map((item) => (
            <TouchableOpacity
              key={item.text}
              className="flex-row items-center space-x-2"
              onPress={item.onPress}
            >
              {item.icon}
              <Text className="font-InterMedium text-[16px]">{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetModal>
    </>
  );
};

export const ButtonUploadType = () => {
  const {
    bottomSheetModalRef,
    snapPoints,
    openModal,
    closeModal,
    renderBackdrop,
  } = bottomModalConfig(["40%"]);

  const [type, setType] = React.useState("Publik");

  const options = [
    {
      id: 1,
      type: "Publik",
      desc: "Semua orang bisa melihat.",
      iconName: "people",
      onPress: () => {
        setType("Publik");
        closeModal();
      },
    },
    {
      id: 2,
      type: "Private",
      desc: "Tidak seorangpun yang bisa melihat kecuali kamu.",
      iconName: "lock-closed",
      onPress: () => {
        setType("Private");
        closeModal();
      },
    },
  ];

  return (
    <>
      <StyledPressable
        className={`w-full py-[7px] ${styles.pressableEffect} flex-row justify-center items-center space-x-1 border border-blue rounded-full`}
        onPress={openModal}
      >
        <Text className="font-InterMedium text-blue text-center">{type}</Text>
        <MaterialIcons name="keyboard-arrow-down" size={20} color={"#1D7ED8"} />
      </StyledPressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <View className="flex-1 p-2 space-y-2">
          {options.map((item) => (
            <StyledPressable
              key={item.id}
              className={`py-2 flex-row items-center space-x-4 active:bg-gray-200`}
              onPress={item.onPress}
            >
              <Ionicons
                name={item.iconName}
                size={30}
                color={type === item.type ? "#1D7ED8" : "#7D7D7D"}
              />
              <View className="w-8/12">
                <Text
                  className={`font-InterSemiBold text-lg ${
                    type === item.type ? "text-blue" : "text-grayCustom"
                  }`}
                >
                  {item.type}
                </Text>
                <Text
                  className={`font-InterRegular ${
                    type === item.type ? "text-blue" : "text-grayCustom"
                  }`}
                >
                  {item.desc}
                </Text>
              </View>
            </StyledPressable>
          ))}
        </View>
      </BottomSheetModal>
    </>
  );
};

export const ButtonBurgerProfile = ({ goToSettings }) => {
  const {
    bottomSheetModalRef,
    snapPoints,
    openModal,
    closeModal,
    renderBackdrop,
  } = bottomModalConfig(["20%"]);

  const options = [
    {
      title: "Pengaturan & Dukungan",
      data: [
        {
          text: "Pengaturan dan Privasi",
          icon: <SimpleLineIcons name="settings" size={22} />,
          onPress: () => {
            goToSettings();
            closeModal();
          },
        },
        {
          text: "Pusat Bantuan",
          icon: <MaterialIcons name="help-outline" size={26} />,
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <>
      <TouchableOpacity onPress={openModal}>
        <SimpleLineIcons name="menu" size={28} />
      </TouchableOpacity>
      {/* bottom modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <SectionList
          sections={options}
          renderSectionHeader={({ section }) => (
            <Text className="px-6 py-2 font-InterMedium text-xl">
              {section.title}
            </Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={item.onPress}
              className="flex-row items-center px-8 pb-2 space-x-2"
            >
              {item.icon}
              <Text className="font-InterRegular text-lg">{item.text}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `basicListEntry-${item.text}`}
        />
      </BottomSheetModal>
    </>
  );
};

export const ButtonScrollToTop = ({ onPress }) => (
  <StyledPressable
    onPress={onPress}
    className={`${styles.pressableEffect} bg-blue rounded-full p-2`}
  >
    <AntDesign name="arrowup" size={24} color="white" />
  </StyledPressable>
);

export const ButtonFollow = ({ title, onPress, isFollow }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full py-[6px] justify-center items-center ${
      isFollow ? "bg-gray-300/50" : "bg-blue"
    } rounded-lg ${styles.pressableEffect}`}
  >
    <Text
      className={`font-InterSemiBold text-[16px] ${!isFollow && "text-white"}`}
    >
      {title}
    </Text>
  </StyledPressable>
);

export const ButtonGray = ({ title, onPress }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full py-[6px] justify-center items-center bg-gray-300/50 rounded-lg ${styles.pressableEffect}`}
  >
    <Text className="font-InterSemiBold text-[16px]">{title}</Text>
  </StyledPressable>
);

export const ButtonBlue = ({ title, onPress, loading, disabled }) => (
  <StyledPressable
    disabled={disabled}
    onPress={onPress}
    className={`w-full py-[6px] justify-center items-center rounded-full ${
      disabled ? "bg-blue/50" : "bg-blue"
    } shadow-md shadow-black ${styles.pressableEffect}`}
  >
    {loading ? (
      <ActivityIndicator size={"large"} color={"#FFF"} />
    ) : (
      <Text className="text-lg font-InterSemiBold text-white">{title}</Text>
    )}
  </StyledPressable>
);

export const ButtonTransparent = ({ title, onPress, borderColor }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full py-[10px] justify-center items-center border-[1.5px] ${borderColor} rounded-2xl ${styles.pressableEffect}`}
  >
    <Text className={`text-[16px] font-InterSemiBold`}>{title}</Text>
  </StyledPressable>
);
