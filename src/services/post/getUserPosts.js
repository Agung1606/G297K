import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { query, collection, where, onSnapshot } from "firebase/firestore";

const getUserPosts = async (userId, setDataTweets) => {
  let queryTweets = query(
    collection(FIREBASE_FIRESTORE, "tweets"),
    where("userId", "==", userId)
  );
  onSnapshot(queryTweets, (response) => {
    setDataTweets(
      response.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export default getUserPosts;
