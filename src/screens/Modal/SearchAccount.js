import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import { setUserSearchHistory } from "../../redux/globalSlice";

import { modalPopupConfig } from "../../hooks";
import { ConfirmModal, SearchUserCard, SearchBar } from "../../components";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const SearchAccount = ({ navigation }) => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const userSearchHistory = useSelector((state) => state.global.userSearchHistory);

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
      username: item.username,
      userId: item.id,
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
            name: doc.data().name,
            username: doc.data().username,
            profile: doc.data().profile,
          };
        })
      );
    });
  }, [searchQuery]);

  return (
    <SafeAreaView className="flex-1 mx-4">
      <SearchBar
        goBack={goBack}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {users && searchQuery ? (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <SearchUserCard
              onPress={() => goToProfile(item)}
              imgUrl={item.profile}
              name={item.name}
              username={item.username}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View>
          {userSearchHistory[0] !== null && (
            <>
              {userSearchHistory.length > 0 && (
                <View className={`my-2 flex-row justify-between items-center`}>
                  <Text className="font-InterRegular text-grayCustom text-lg">
                    Baru saja
                  </Text>
                  <TouchableOpacity onPress={openModal}>
                    <AntDesign name="closecircle" size={20} />
                  </TouchableOpacity>
                </View>
              )}
              <FlatList
                data={userSearchHistory}
                renderItem={({ item }) => (
                  <SearchUserCard
                    onPress={() => goToProfile(item)}
                    imgUrl={item.profile}
                    name={item.name}
                    username={item.username}
                  />
                )}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => (
                  <Text className="font-InterMedium text-grayCustom text-center">
                    Coba telusuri orang
                  </Text>
                )}
              />
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
        textBtnCancel={"Batal"}
        textBtnOk={"Hapus"}
      />
    </SafeAreaView>
  );
};

export default React.memo(SearchAccount);
