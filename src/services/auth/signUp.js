import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const singUp = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    return response.user;
  } catch (error) {
    throw error;
  }
};

export default singUp;
