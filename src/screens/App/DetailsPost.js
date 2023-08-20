import React, { useCallback, useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Spinner from "react-native-loading-spinner-overlay";
import { Ionicons } from "@expo/vector-icons";

import { bottomModalConfig } from "../../hooks";
import { Header, DetailPostCard, CommentCard } from "../../components";

import { deletePost, getSinglePost } from "../../services/post";
import { getComment } from "../../services/comment";

const DetailsPost = ({ route, navigation }) => {
  const { postId } = route?.params;

  const [postData, setPostData] = useState({});
  const [dataComments, setDataComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const goToPrevScreen = useCallback(() => navigation.goBack(), [navigation]);

  const goToVisitProfile = useCallback(() => {
    navigation.navigate("VisitProfileScreen", {
      userId: postData.userId,
    });
  }, [navigation, postData.userId]);

  const openModalSendComment = useCallback(() => {
    navigation.navigate("SendComment", {
      postId: postData.id,
      username: postData.username,
    });
  }, [navigation, postData.id]);

  useEffect(() => {
    getSinglePost(postId, setPostData);
    getComment(postId, setDataComments);
  }, []);

  const {
    bottomSheetModalRef,
    snapPoints,
    openModal: openBottomModal,
    closeModal: closeBottomModal,
    renderBackdrop,
  } = bottomModalConfig(["12%"]);

  return (
    <SafeAreaView className="flex-1">
      <Spinner visible={loading} textContent="Menghapus postingan" />
      <Header onPress={goToPrevScreen} text="Post" />
      <FlatList
        ListHeaderComponent={
          <DetailPostCard
            postData={postData}
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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <TouchableOpacity
          onPress={() => {
            closeBottomModal();
            deletePost(postData.id, setLoading, goToPrevScreen);
          }}
          className="bg-gray-300 flex-row items-center justify-between mx-3 p-3 rounded-md"
        >
          <Text className="font-InterSemiBold text-red-600">Hapus</Text>
        </TouchableOpacity>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default DetailsPost;
