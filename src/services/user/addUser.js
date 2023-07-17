import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const addUser = async (data) => {
  try {
    const collectionRef = collection(FIREBASE_FIRESTORE, "users");
    await addDoc(collectionRef, data);
  } catch (error) {
    throw error;
  }
};

export default addUser;
