import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { doc, collection, deleteDoc } from "firebase/firestore";

import { ToastAndroid } from "react-native";

function showToast() {
  ToastAndroid.show("Berhasil hapus postingan ジ", ToastAndroid.SHORT);
}

const deleteTweet = async (tweetId, setLoading, goToPrevScreen) => {
  if (!tweetId) throw new Error("Invalid tweetId");
  try {
    // the request is ongoing
    setLoading(true);

    const documentRef = doc(collection(FIREBASE_FIRESTORE, "tweets"), tweetId);
    await deleteDoc(documentRef);

    goToPrevScreen();
    showToast();
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};

export default deleteTweet;
