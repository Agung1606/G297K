import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { bottomModalConfig } from "../../hooks";
import { styles } from "../../style/Global";
import { Interaction } from "./TweetCard";
import { Avatar } from "../common";

const TweetDetailCard = ({ item, goToVisitProfile }) => {
  return (
    <View className="px-3 py-2 mb-2 border-b border-gray-300">
      <View className={`flex-row ${styles.flexBetween} mb-2`}>
        <View className="flex-row items-center space-x-4">
          <Avatar imgUrl={item.profile} size={50} onPress={goToVisitProfile} />
          <View>
            <View className="flex-row items-center space-x-1">
              <Text className="font-InterBold">{item.name}</Text>
              <Text className="font-InterRegular text-xs text-grayCustom">
                @{item.username}
              </Text>
            </View>
            <Text className="text-[12px] text-grayCustom">{item.date}</Text>
          </View>
        </View>
        <ButtonMoreVert tweetId={item.id} username={item.username} />
      </View>
      {/* tweets */}
      <Text className="font-InterRegular text-[17px]">{item.tweet}</Text>
      <View className="my-4">
        <Interaction
          name={item.name}
          numberOfLikes={item.numberOfLikes}
          numberOfComments={item.numberOfComments}
        />
      </View>
    </View>
  );
};

const ButtonMoreVert = ({ tweetId, username }) => {
  const {
    bottomSheetModalRef,
    snapPoints,
    openModal,
    closeModal,
    renderBackdrop,
  } = bottomModalConfig(["15%"]);

  const options = [
    {
      icon: <MaterialIcons name="person-add" size={30} />,
      text: `Ikuti @${username}`,
      onPress: () => {
        alert(`Followed ${username}`);
        closeModal();
      },
    },
    {
      icon: <MaterialIcons name="report" size={30} color={"red"} />,
      text: "Laporkan tweet ini",
      onPress: () => {
        alert("Report this tweet");
        closeModal();
      },
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

export default TweetDetailCard;
