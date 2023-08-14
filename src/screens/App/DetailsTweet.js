import React, { useCallback, useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Spinner from "react-native-loading-spinner-overlay";
import { Ionicons } from "@expo/vector-icons";

import { bottomModalConfig } from "../../hooks";
import { Header, TweetDetailCard, CommentCard } from "../../components";

import { deleteTweet } from "../../services/tweet";
import { getComment } from "../../services/comment";

const DetailsTweet = ({ route, navigation }) => {
  const { item } = route?.params;
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
  } = bottomModalConfig(["12%"]);

  const [dataComments, setDataComments] = useState([]);
  useEffect(() => {
    getComment(item.id, setDataComments);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      {/* loading spinner */}
      <Spinner visible={loading} textContent="Menghapus postingan" />
      <Header onPress={goToPrevScreen} text="Post" />
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
          <Ionicons name="chatbubbles-outline" size={20} color={"#7d7d7d"} />
        </TouchableOpacity>
      </View>
      {/* bottom modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <TouchableOpacity
          onPress={() => {
            closeBottomModal();
            deleteTweet(item.id, setLoading, goToPrevScreen);
          }}
          className="bg-gray-300 flex-row items-center justify-between mx-3 p-3 rounded-md"
        >
          <Text className="font-InterSemiBold text-red-600">Hapus</Text>
        </TouchableOpacity>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default React.memo(DetailsTweet);
