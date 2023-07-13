import React, { useState } from "react";
import {
  Text,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { styles } from "../../style/Global";
import { bottomModalConfig } from "../../hooks";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

export const ButtonUploadType = () => {
  const {
    bottomSheetModalRef,
    snapPoints,
    openModal,
    closeModal,
    renderBackdrop,
  } = bottomModalConfig(["40%"]);

  const [type, setType] = useState("Publik");

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
  } = bottomModalConfig(["15%"]);

  const options = [
    {
      id: 1,
      text: "Pengaturan dan Privasi",
      icon: <Ionicons name="settings-outline" size={22} />,
      onPress: () => {
        goToSettings();
        closeModal();
      },
    },
    {
      id: 2,
      text: "Pusat Bantuan",
      icon: <Ionicons name="md-help-circle-outline" size={22} />,
      onPress: () => {},
    },
  ];

  return (
    <>
      <TouchableOpacity onPress={openModal}>
        <Ionicons name="md-options-outline" size={30} />
      </TouchableOpacity>
      {/* bottom modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <FlatList
          data={options}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={item.onPress}
              className="flex-row items-center space-x-4 px-4 mb-3"
            >
              {item.icon}
              <Text className="font-InterRegular text-lg">{item.text}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
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

export const ButtonFollow = ({ loading, title, onPress, isFollow }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full py-[6px] justify-center items-center ${
      isFollow ? "bg-gray-300/50" : "bg-blue"
    } rounded-lg ${styles.pressableEffect}`}
  >
    {loading ? (
      <ActivityIndicator size={"small"} color={"#FFF"} />
    ) : (
      <Text
        className={`font-InterSemiBold text-[16px] ${
          !isFollow && "text-white"
        }`}
      >
        {title}
      </Text>
    )}
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
