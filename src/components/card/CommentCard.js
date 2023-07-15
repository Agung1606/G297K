import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

import { Avatar } from "../common";
import { bottomModalConfig } from "../../hooks";
import { formatRelativeTime } from "../../utils";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { doc, collection, deleteDoc } from "firebase/firestore";

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
  } = bottomModalConfig(["10%"]);

  const loggedInUserId = useSelector((state) => state.global.user.id);
  const [loading, setLoading] = useState(false);

  const handleDeleteComment = async () => {
    setLoading(true);
    closeBottomModal();

    const parentDocRef = doc(FIREBASE_FIRESTORE, "tweets", item.tweetId);
    const subcollectionRef = collection(parentDocRef, "comments");

    const docToDelete = doc(subcollectionRef, item.id);

    try {
      await deleteDoc(docToDelete);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const options = [
    {
      icon:
        loggedInUserId === item.userId ? (
          <Ionicons name="trash-outline" size={22} />
        ) : (
          <Ionicons name="warning-sharp" size={22} />
        ),
      text: loggedInUserId === item.userId ? "Hapus" : "Laporkan komentar ini",
      onPress: () => {
        if (loggedInUserId === item.userId) {
          handleDeleteComment();
        } else {
          // Report functionality here
          closeBottomModal();
        }
      },
    },
  ];

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
            <TouchableOpacity onPress={openBottomModal}>
              <MaterialIcons name="more-vert" size={25} />
            </TouchableOpacity>
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
        {options.map((item) => (
          <TouchableOpacity
            key={item.text}
            onPress={item.onPress}
            className="flex-row items-center space-x-4 px-4 mb-3"
          >
            {item.icon}
            <Text className="font-InterRegular text-lg">{item.text}</Text>
          </TouchableOpacity>
        ))}
      </BottomSheetModal>
    </>
  );
};

export default CommentCard;
