import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const getUsers = async (setUsers) => {
  let collectionRef = collection(FIREBASE_FIRESTORE, "users");

  const unsubscribe = onSnapshot(
    collectionRef,
    (response) => {
      const users = response.docs.map((doc) => ({
        id: doc.id,
        username: doc.data().username,
        name: doc.data().name,
        profile: doc.data().profile
      }));
      setUsers(users);
    },
    (error) => {
      console.log("Error fetching users: ", error)
    }
  )

  return () => unsubscribe();
};

export default getUsers;