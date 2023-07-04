import React, { useCallback, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import { COMMENTS } from "../../constant";
import { bottomModalConfig, modalPopupConfig } from "../../hooks";
import {
  Header,
  TweetDetailCard,
  CommentCard,
  ConfirmModal,
} from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { doc, collection, deleteDoc } from "firebase/firestore";

const DetailsTweet = ({ route, navigation }) => {
  const item = route?.params?.param;
  const loggedInUserId = useSelector((state) => state.global.user.id);
  const [loading, setLoading] = useState(false);

  const goToPrevScreen = useCallback(() => navigation.goBack(), [navigation]);
  const goToVisitProfile = useCallback(() => {
    navigation.navigate("VisitProfileScreen", {
      param: { username: item.username, userId: item.userId },
    });
  }, [navigation, item]);
  const openModalSendComment = useCallback(() => {
    navigation.navigate("SendComment", { param: item });
  }, [navigation, item]);

  const {
    bottomSheetModalRef,
    snapPoints,
    openModal: openBottomModal,
    closeModal: closeBottomModal,
    renderBackdrop,
  } = bottomModalConfig(["10%"]);
  const {
    isModalOpen,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = modalPopupConfig();

  const handleDeleteTweet = useCallback(async () => {
    const documentRef = doc(collection(FIREBASE_FIRESTORE, "tweets"), item.id);
    closeConfirmModal();
    setLoading(true);
    try {
      await deleteDoc(documentRef);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [navigation, item.id]);

  const options = [
    {
      icon:
        loggedInUserId === item.userId ? (
          <Ionicons name="trash-outline" size={30} color={"#7d7d7d"} />
        ) : (
          <MaterialIcons name="report" size={30} color={"#7d7d7d"} />
        ),
      text: loggedInUserId === item.userId ? "Hapus" : "Laporkan tweet ini",
      onPress: () => {
        if (loggedInUserId === item.userId) {
          closeBottomModal();
          openConfirmModal();
        } else {
          // Report functionality here
          alert("Report...");
        }
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      {/* loading spinner */}
      <Spinner visible={loading} />
      <Header onPress={goToPrevScreen} text="Tweet" />
      {/* this configuration is just for a while */}
      <FlatList
        ListHeaderComponent={
          <TweetDetailCard
            item={item}
            goToVisitProfile={goToVisitProfile}
            openBottomModal={openBottomModal}
            openModalSendComment={openModalSendComment}
          />
        }
        data={COMMENTS}
        renderItem={({ item }) => <CommentCard item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => <View className="my-5" />}
      />
      {/* comment button that always there */}
      <View className="p-2 border-t border-grayCustom">
        <Pressable
          onPress={openModalSendComment}
          className={`flex-row justify-between items-center py-2 border-b-2 border-blue`}
        >
          <Text className="text-grayCustom font-InterMedium">
            Kirim komentar Anda
          </Text>
          <FontAwesome name="comments-o" size={20} color={"#1D7ED8"} />
        </Pressable>
      </View>
      {/* bottom modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <View className="px-6">
          {options.map((item) => (
            <Pressable
              key={item.text}
              onPress={item.onPress}
              className="flex-row items-center space-x-2"
            >
              {item.icon}
              <Text className="font-InterMedium text-[16px]">{item.text}</Text>
            </Pressable>
          ))}
        </View>
      </BottomSheetModal>
      {/* confirm modal */}
      <ConfirmModal
        isModalOpen={isModalOpen}
        onCancel={closeConfirmModal}
        onOk={handleDeleteTweet}
        title={"Hapus tweet?"}
        textBtnOk={"Hapus"}
        textBtnCancel={"Batal"}
      />
    </SafeAreaView>
  );
};

export default React.memo(DetailsTweet);
