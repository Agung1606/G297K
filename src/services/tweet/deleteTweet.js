import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { doc, collection, deleteDoc } from "firebase/firestore";

const deleteTweet = async (
  tweetId,
  setLoading,
  closeConfirmModal,
  goToPrevScreen
) => {
  setLoading(true);
  closeConfirmModal();
  try {
    const documentRef = doc(collection(FIREBASE_FIRESTORE, "tweets"), tweetId);
    await deleteDoc(documentRef);
    goToPrevScreen();
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};

export default deleteTweet;
