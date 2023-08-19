import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

const signIn = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );

    return response.user;
  } catch (error) {
   throw error;
  }
};

export default signIn;
