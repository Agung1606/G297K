import { collection, doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";

const getUser = async (userId, setData) => {
  const collectionRef = collection(FIREBASE_FIRESTORE, "users");
  const documentRef = doc(collectionRef, userId);

  const unsubscribe = onSnapshot(
    documentRef,
    (response) => {
      setData({
        ...response.data(),
        id: response.id
      })
    },
    (error) => {
      console.log(error)
    }
  );

  return () => unsubscribe();
};

export default getUser;