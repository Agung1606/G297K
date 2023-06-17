import React from "react";
import { Text, ActivityIndicator, Pressable, View } from "react-native";
import { RadioButton } from "react-native-paper";
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
  } = bottomModalConfig(["22%"]);

  const [type, setType] = React.useState("Publik");
  
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
          <StyledPressable>
            <Ionicons name="people" size={22} />
          </StyledPressable>
        </View>
      </BottomSheetModal>
    </>
  );
};
// const options = [
//   {
//     id: 1,
//     value: "Publik",
//     onPress: () => {
//       setChecked("Publik");
//       closeModal();
//     }
//   },
//   {
//     id: 2,
//     value: "Private",
//     onPress: () => {
//       setChecked("Private");
//       closeModal();
//     }
//   },
// ];

// {options.map((item) => (
//   <View key={item.id}>
//     <RadioButton
//       value={item.value}
//       status={checked === item.value ? "checked" : "unchecked"}
//       onPress={item.onPress}
//     />
//     <Text className="absolute top-1 left-12 font-InterSemiBold text-lg">
//       {item.value}
//     </Text>
//   </View>
// ))}

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
