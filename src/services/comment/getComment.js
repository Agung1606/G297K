import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";

const getComment = (postId, setDataComments) => {
  // early check
  if (!postId) throw new Error("Invalid postId");

  // set up collection
  const collectionRef = collection(
    FIREBASE_FIRESTORE,
    `tweets/${postId}/comments`
  );

  // set up listener and error handling
  const unsubscribe = onSnapshot(
    collectionRef,
    (response) => {
      const comments = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataComments(comments);
    },
    (error) => {
      // error handling
      console.error("Error fetching comments:", error);
    }
  );

  return () => unsubscribe();
};

export default getComment;
