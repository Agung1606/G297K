import React, { useCallback, useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import { bottomModalConfig, modalPopupConfig } from "../../hooks";
import {
  Header,
  TweetDetailCard,
  CommentCard,
  ConfirmModal,
} from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { doc, collection, deleteDoc, onSnapshot } from "firebase/firestore";

const DetailsTweet = ({ route, navigation }) => {
  const { item } = route?.params;
  const loggedInUserId = useSelector((state) => state.global.user.id);
  const [loading, setLoading] = useState(false);

  const goToPrevScreen = useCallback(() => navigation.goBack(), [navigation]);

  const goToVisitProfile = useCallback(() => {
    navigation.navigate("VisitProfileScreen", {
      username: item.username,
      userId: item.userId,
    });
  }, [navigation, item]);

  const openModalSendComment = useCallback(() => {
    navigation.navigate("SendComment", { item });
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
    setLoading(true);

    closeConfirmModal();
    try {
      const documentRef = doc(collection(FIREBASE_FIRESTORE, "tweets"), item.id);
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
          <Ionicons name="trash-outline" size={22} />
        ) : (
          <Ionicons name="warning-sharp" size={22} />
        ),
      text: loggedInUserId === item.userId ? "Hapus" : "Laporkan postingan ini",
      onPress: () => {
        if (loggedInUserId === item.userId) {
          closeBottomModal();
          openConfirmModal();
        } else {
          // Report functionality here
          closeBottomModal();
        }
      },
    },
  ];

  const [dataComments, setDataComments] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(FIREBASE_FIRESTORE, `tweets/${item.id}/comments`),
      (snapshot) => {
        const comments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataComments(comments);
      },
      (error) => {
        console.error("Error fetching comments:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [item.id]);

  return (
    <SafeAreaView className="flex-1">
      {/* loading spinner */}
      <Spinner visible={loading} textContent="Menghapus postingan" />
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
        data={dataComments}
        renderItem={({ item }) => <CommentCard item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => <View className="my-5" />}
      />
      {/* comment button that always there */}
      <View className="p-2 border-t border-grayCustom">
        <TouchableOpacity
          onPress={openModalSendComment}
          className={`flex-row justify-between items-center py-2 border-b-2 border-blue`}
        >
          <Text className="text-grayCustom font-InterMedium">
            Kirim komentar Anda
          </Text>
          <FontAwesome name="comments-o" size={20} color={"#1D7ED8"} />
        </TouchableOpacity>
      </View>
      {/* bottom modal */}
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
      {/* confirm modal */}
      <ConfirmModal
        isModalOpen={isModalOpen}
        onCancel={closeConfirmModal}
        onOk={handleDeleteTweet}
        title={"Hapus postingan?"}
        textBtnOk={"Hapus"}
        textBtnCancel={"Batal"}
      />
    </SafeAreaView>
  );
};

export default React.memo(DetailsTweet);
