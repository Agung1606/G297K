import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const addComment = async (loggedInUserData, tweetId, commentInput) => {
  try {
    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    const timeString = currentDate.toTimeString().split(" ")[0];
    const timeZoneString = currentDate.toTimeString().split(" ")[1];

    const data = {
      tweetId,
      userId: loggedInUserData.id,
      username: loggedInUserData.username,
      profile: loggedInUserData.profile,
      comment: commentInput,
      date: `${dateString} ${timeString} ${timeZoneString}`
    };
    
    await addDoc(collection(FIREBASE_FIRESTORE, `tweets/${tweetId}/comments`), data);
  } catch (error) {
    throw error;
  }
};

export default addComment;
