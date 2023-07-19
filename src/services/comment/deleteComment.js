import { collection, deleteDoc, doc } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";

const deleteComment = async (
  commentId,
  tweetId,
  setLoading,
  closeBottomModal
) => {
  if (!commentId || !tweetId) throw new Error("Invalid argument");

  try {
    // the process is ongoing
    setLoading(true);
    // immedietly close bottom modal
    closeBottomModal();

    // set up
    const parentDocRef = doc(FIREBASE_FIRESTORE, `tweets/${tweetId}`);
    const subCollectionRef = collection(parentDocRef, "comments");

    await deleteDoc(doc(subCollectionRef, commentId));
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};

export default deleteComment;
