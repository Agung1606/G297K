import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";

const getTweets = (setDataTweets) => {
  let queryTweets = query(
    collection(FIREBASE_FIRESTORE, "tweets"),
    orderBy("date", "asc")
  );
  onSnapshot(queryTweets, (response) => {
    setDataTweets(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
};

export default getTweets;
