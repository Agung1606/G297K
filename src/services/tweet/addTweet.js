import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const addTweet = async (loggedInUserData, tweetInput) => {
  try {
    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    const timeString = currentDate.toTimeString().split(" ")[0];
    const timeZoneString = currentDate.toTimeString().split(" ")[1];

    const data = {
      userId: loggedInUserData.id,
      username: loggedInUserData.username,
      profile: loggedInUserData.profile,
      tweet: tweetInput,
      date: `${dateString} ${timeString} ${timeZoneString}`,
    };

    await addDoc(collection(FIREBASE_FIRESTORE, "tweets"), data);
  } catch (error) {
    throw error;
  }
};

export default addTweet;
