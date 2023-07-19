import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";

const getComment = (tweetId, setDataComments) => {
  // early check
  if (!tweetId) throw new Error("Invalid tweetId");

  // set up collection
  const collectionRef = collection(
    FIREBASE_FIRESTORE,
    `tweets/${tweetId}/comments`
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
