import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { collection, doc, onSnapshot } from "firebase/firestore"

const getSinglePost = async (postId, setPostData) => {
  const collectionRef = collection(FIREBASE_FIRESTORE, "tweets");
  const documentRef = doc(collectionRef, postId);

  const unsubscribe = onSnapshot(
    documentRef,
    (response) => {
      setPostData({
        ...response.data(),
        id: response.id,
      });
    },
    (error) => {
      console.error(error);
    }
  );

  return () => unsubscribe();
};

export default getSinglePost;