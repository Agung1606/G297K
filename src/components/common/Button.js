import React from "react";
import { Text, ActivityIndicator, Pressable, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
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
  } = bottomModalConfig(["30%"]);

  const [type, setType] = React.useState("Publik");

  const options = [
    {
      id: 1,
      type: "Publik",
      iconName: "people",
      onPress: () => {
        setType("Publik");
        closeModal();
      },
    },
    {
      id: 2,
      type: "Private",
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
        className={`${styles.pressableEffect} flex-row ${styles.flexCenter} space-x-1 border border-blue rounded-full w-24 p-[7px]`}
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
              <Text
                className={`font-InterSemiBold text-lg ${
                  type === item.type ? "text-blue" : "text-grayCustom"
                }`}
              >
                {item.type}
              </Text>
            </StyledPressable>
          ))}
        </View>
      </BottomSheetModal>
    </>
  );
};

export const ButtonFollow = ({ title, onPress, isFollow }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full h-[35px] ${styles.flexCenter} ${
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
    className={`w-full h-[35px] ${styles.flexCenter} bg-gray-300/50 rounded-lg ${styles.pressableEffect}`}
  >
    <Text className="font-InterSemiBold text-[16px]">{title}</Text>
  </StyledPressable>
);

export const ButtonBlue = ({ title, onPress, loading }) => (
  <StyledPressable
    onPress={onPress}
    className={`w-full h-[42px] ${styles.flexCenter} rounded-full bg-blue shadow-md shadow-black ${styles.pressableEffect}`}
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
    className={`w-full h-[45px] ${styles.flexCenter} border-[1.5px] ${borderColor} rounded-2xl ${styles.pressableEffect}`}
  >
    <Text className={`text-[16px] font-InterSemiBold`}>{title}</Text>
  </StyledPressable>
);
