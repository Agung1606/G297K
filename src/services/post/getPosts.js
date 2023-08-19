import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";

const getPosts = (setDataTweets) => {
  // set up the query
  let queryTweets = query(
    collection(FIREBASE_FIRESTORE, "tweets"),
    orderBy("date", "asc")
  );

  // set up the listener and error handling
  const unsubscribe = onSnapshot(
    queryTweets,
    (response) => {
      // mapping data
      const tweets = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDataTweets(tweets);
    },
    (error) => {
      // error handling
      console.error("Error fetching tweets: ", error);
      // Optionally, you can set an error state or show an error message to the user.
    }
  );

  return () => unsubscribe();
};

export default getPosts;