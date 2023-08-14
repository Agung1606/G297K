import { FIREBASE_FIRESTORE, FIREBASE_STORAGE } from "../../../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { assets } from "../../constant";

import { ToastAndroid } from "react-native";

function showToast() {
  ToastAndroid.show("Berhasil update profil ジ", ToastAndroid.SHORT);
}

const editHandler = async (
  selectedImage,
  name,
  username,
  bio,
  setLoading,
  loggedInUserData,
  setErrorMsg,
  openModal,
  dispatch,
  setUpdateUser,
  goToPrevScreen
) => {
  if (!name || !username) {
    setErrorMsg("Nama atau username dibutuhkan 🙏");
    openModal();
    return;
  }

  setLoading(true);

  const batch = writeBatch(FIREBASE_FIRESTORE);
  let newProfile;

  if (selectedImage && selectedImage !== assets.defaultProfile) {
    try {
      const blobImg = await fetch(selectedImage).then((response) =>
        response.blob()
      );

      const metadata = {
        contentType: "image/jpeg",
      };

      const imageName = selectedImage.match(/\/([^\/]+\.(jpeg|jpg|png))$/)[1];

      const storageRef = ref(FIREBASE_STORAGE, "profile/" + imageName);
      const uploadTask = uploadBytesResumable(storageRef, blobImg, metadata);

      const snapshot = await uploadTask;

      newProfile = await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  } else {
    newProfile = selectedImage;
  }

  const userRef = doc(
    collection(FIREBASE_FIRESTORE, "users"),
    loggedInUserData.id
  );
  const tweetRef = collection(FIREBASE_FIRESTORE, "tweets");

  const userUpdateData = {
    name,
    username,
    bio,
  };

  if (newProfile) {
    userUpdateData.profile = newProfile;
  }

  const usernameChanged = username !== loggedInUserData.username;

  batch.update(userRef, userUpdateData);

  if (usernameChanged || newProfile) {
    const tweetsQuerySnapshot = await getDocs(
      query(tweetRef, where("userId", "==", loggedInUserData.id))
    );

    tweetsQuerySnapshot.docs.forEach((doc) => {
      const docRef = doc.ref;
      const updateData = {
        username,
      };

      if (newProfile) {
        updateData.profile = newProfile;
      }

      batch.update(docRef, updateData);
    });
  }

  try {
    await batch.commit();
    dispatch(setUpdateUser({ name, username, bio, newProfile }));
    goToPrevScreen();
    showToast();
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    setLoading(false);
  }
};

export default editHandler;
