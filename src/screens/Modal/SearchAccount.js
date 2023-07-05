import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import { setUserSearchHistory } from "../../redux/globalSlice";

import { styled } from "nativewind";
const StyledPressable = styled(Pressable);

import { modalPopupConfig } from "../../hooks";
import { ConfirmModal, Avatar } from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const SearchBar = ({ goBack, searchQuery, setSearchQuery }) => (
  <View
    className={`flex-row justify-between items-center py-2 px-4 border-b border-gray-600`}
  >
    <Pressable onPress={goBack}>
      <AntDesign name="arrowleft" size={22} />
    </Pressable>
    <View className="flex-1 px-4 py-2 ml-6">
      <TextInput
        placeholder="Cari akun"
        className="font-InterMedium text-gray-600"
        autoFocus={true}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  </View>
);

const SearchAccount = ({ navigation }) => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const userSearchHistory = useSelector(
    (state) => state.global.userSearchHistory
  );

  const handleHistory = (item) => {
    const isUserAlreadyExist = userSearchHistory.some(
      (user) => user?.id === item.id
    );
    if (!isUserAlreadyExist) {
      dispatch(setUserSearchHistory([item, ...userSearchHistory]));
    }
  };

  const goBack = () => navigation.goBack();
  const goToProfile = (item) => {
    navigation.navigate("VisitProfileScreen", {
      param: { username: item.username, userId: item.id },
    });
    handleHistory(item);
  };

  const { isModalOpen, openModal, closeModal } = modalPopupConfig();

  useEffect(() => {
    const q = query(
      collection(FIREBASE_FIRESTORE, "users"),
      where("username", ">=", searchQuery)
    );
    onSnapshot(q, (response) => {
      setUsers(
        response.docs.map((doc) => {
          return {
            id: doc.id,
            username: doc.data().username,
            name: doc.data().name,
            profile: doc.data().profile,
          };
        })
      );
    });
  }, [searchQuery]);

  return (
    <SafeAreaView className="flex-1 ">
      <SearchBar
        goBack={goBack}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {users && searchQuery ? (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <StyledPressable
              onPress={() => goToProfile(item)}
              key={item.id}
              className="m-2 p-2 flex-row items-center space-x-4 active:bg-gray-200 rounded-lg"
            >
              <Avatar imgUrl={item.profile} size={45} />
              <View>
                <Text className="font-InterBold">{item.name}</Text>
                <Text className="font-InterRegular text-grayCustom">
                  @{item.username}
                </Text>
              </View>
            </StyledPressable>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View className="m-2">
          {userSearchHistory[0] !== null && (
            <>
              {userSearchHistory.length > 0 && (
                <View className={`mb-2 flex-row justify-between items-center`}>
                  <Text className="font-InterSemiBold text-lg text-grayCustom">
                    Baru saja
                  </Text>
                  <Pressable onPress={openModal}>
                    <AntDesign name="closecircle" size={20} />
                  </Pressable>
                </View>
              )}
              <FlatList
                data={userSearchHistory}
                renderItem={({ item }) => (
                  <StyledPressable
                    onPress={() => goToProfile(item)}
                    key={item.id}
                    className="mr-6 p-2 items-center active:bg-gray-200 rounded-lg"
                  >
                    <Avatar
                      imgUrl={item.profile}
                      size={40}
                      onPress={() => goToProfile(item)}
                    />
                    <View className="items-center">
                      <Text className="font-InterMedium">{item.name}</Text>
                      <Text className="font-InterRegular text-grayCustom">
                        @{item.username}
                      </Text>
                    </View>
                  </StyledPressable>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
              />
              {userSearchHistory.length === 0 && (
                <Text className="font-InterSemiBold text-center text-grayCustom">
                  Coba telusuri orang
                </Text>
              )}
            </>
          )}
        </View>
      )}
      {/* confirm modal to make sure you really wanna remove all history */}
      <ConfirmModal
        isModalOpen={isModalOpen}
        onCancel={closeModal}
        onOk={() => {
          dispatch(setUserSearchHistory([]));
          closeModal();
        }}
        title={"Hapus semua pencarian terbaru?"}
        subtitle={"Tindakan ini menghapus semua penelusuran terbaru"}
        textBtnCancel={"Batal"}
        textBtnOk={"Hapus"}
      />
    </SafeAreaView>
  );
};

export default React.memo(SearchAccount);
