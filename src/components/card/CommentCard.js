import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Spinner from "react-native-loading-spinner-overlay";

import { Avatar } from "../common";
import { bottomModalConfig } from "../../hooks";
import { formatRelativeTime } from "../../utils";

import { deleteComment } from "../../services/comment";

const CommentCard = ({ item }) => {
  const navigation = useNavigation();
  const goToVisitProfile = () =>
    navigation.navigate("VisitProfileScreen", {
      username: item.username,
      userId: item.userId,
    });

  const {
    bottomSheetModalRef,
    snapPoints,
    openModal: openBottomModal,
    closeModal: closeBottomModal,
    renderBackdrop,
  } = bottomModalConfig(["12%"]);

  const loggedInUserId = useSelector((state) => state.global.user.id);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Spinner visible={loading} textContent="Tunggu..." />
      <View className="flex-row space-x-2 px-2 py-4 border-b border-gray-300">
        <Avatar imgUrl={item.profile} size={40} onPress={goToVisitProfile} />
        <View className="flex-1">
          {/* username and date */}
          <View className="mb-1 flex-row items-center justify-between">
            <View>
              <Text className="font-InterSemiBold">{item.username}</Text>
              <Text className="text-[10px] font-InterRegular text-gray-400">
                {formatRelativeTime(item.date)}
              </Text>
            </View>
            {loggedInUserId === item.userId && (
              <TouchableOpacity onPress={openBottomModal}>
                <MaterialIcons name="more-vert" size={25} />
              </TouchableOpacity>
            )}
          </View>
          {/* comment */}
          <Text className="font-RobotoRegular text-[15px]">{item.comment}</Text>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <TouchableOpacity
          onPress={() => deleteComment(item.id, item.tweetId, setLoading, closeBottomModal)}
          className="bg-gray-300 flex-row items-center justify-between mx-3 p-3 rounded-md"
        >
          <Text className="font-InterSemiBold text-red-600">Hapus</Text>
        </TouchableOpacity>
      </BottomSheetModal>
    </>
  );
};

export default CommentCard;
