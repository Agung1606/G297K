import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";

const getUser = async (email) => {
  try {
    const collectionRef = collection(FIREBASE_FIRESTORE, "users");
    const userQuery = query(collectionRef, where("email", "==", email));
    const userData = await getDocs(userQuery);

    return {
      userId: userData.docs[0].id,
      userData: userData.docs[0].data(),
    };
  } catch (error) {
    throw error;
  }
};

export default getUser;
