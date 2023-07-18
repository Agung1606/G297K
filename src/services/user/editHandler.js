import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import {
  collection,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const editHandler = async (
  name,
  username,
  bio,
  setLoading,
  loggedInUserData,
  setErrorMsg,
  openModal,
  dispatch,
  setUpdateUser,
  goToPrevScreen
) => {
  // added an early return if either the name or username is empty
  if (!name || !username) {
    setErrorMsg("Nama atau username dibutuhkan 🙏");
    openModal();
    return;
  }

  // sets the loading state to true to indicate that the update operation is in progress
  setLoading(true);

  const collectionUserRef = collection(FIREBASE_FIRESTORE, "users");
  const collectionTweetRef = collection(FIREBASE_FIRESTORE, "tweets");

  const userUpdatePromise = updateDoc(
    doc(collectionUserRef, loggedInUserData.id),
    {
      name,
      username,
      bio,
    }
  );

  const usernameChanged = username !== loggedInUserData.username;

  try {
    if (usernameChanged) {
      const tweetsQuerySnapshot = await getDocs(
        query(collectionTweetRef, where("userId", "==", loggedInUserData.id))
      );
      const tweetUpdatePromise = tweetsQuerySnapshot.docs.map((doc) => {
        const docRef = doc.ref;
        const updateData = {
          username,
        };
        return updateDoc(docRef, updateData);
      });

      await Promise.all([userUpdatePromise, ...tweetUpdatePromise]);
    } else {
      await userUpdatePromise;
    }

    dispatch(setUpdateUser({ name, username, bio }));
    goToPrevScreen();
  } catch (error) {
  } finally {
    setLoading(false);
  }
};

export default editHandler;
