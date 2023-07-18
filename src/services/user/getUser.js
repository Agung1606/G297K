import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";

const getUser = async (input) => {
  try {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let userQuery;

    const collectionRef = collection(FIREBASE_FIRESTORE, "users");
    if (emailRegex.test(input)) {
      userQuery = query(collectionRef, where("email", "==", input));
    } else {
      userQuery = query(collectionRef, where("username", "==", input));
    }

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
