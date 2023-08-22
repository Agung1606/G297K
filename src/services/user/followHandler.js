import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

const followeHandler = async (
  loggedInUserData,
  data,
  myFollowing,
  setLoading
) => {
  setLoading(true);
  try {
    const loggedInUserFollowingRef = collection(
      FIREBASE_FIRESTORE,
      `users/${loggedInUserData.id}/following`
    );
    const otherUserFollowersRef = collection(
      FIREBASE_FIRESTORE,
      `users/${data.id}/followers`
    );

    if (myFollowing) {
      const queryLoggedInUser = query(
        loggedInUserFollowingRef,
        where("userId", "==", data.id)
      );
      const queryOtherUser = query(
        otherUserFollowersRef,
        where("userId", "==", loggedInUserData.id)
      );

      const [snapshotLoggedInUser, snapshotOtherUser] = await Promise.all([
        getDocs(queryLoggedInUser),
        getDocs(queryOtherUser),
      ]);

      const [loggedInFollowingDoc, otherFollowersDoc] = [
        snapshotLoggedInUser.docs[0],
        snapshotOtherUser.docs[0],
      ];

      if (loggedInFollowingDoc && otherFollowersDoc) {
        await Promise.all([
          deleteDoc(loggedInFollowingDoc.ref),
          deleteDoc(otherFollowersDoc.ref),
        ]);
      }
    } else {
      const loggedInUser = {
        userId: loggedInUserData.id,
        profile: loggedInUserData.profile,
        name: loggedInUserData.name,
        username: loggedInUserData.username,
      };

      const otherUser = {
        userId: data.id,
        profile: data.profile,
        name: data.name,
        username: data.username,
      };

      await Promise.all([
        addDoc(loggedInUserFollowingRef, otherUser),
        addDoc(otherUserFollowersRef, loggedInUser),
      ]);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
export default followeHandler;
