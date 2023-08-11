import { FIREBASE_FIRESTORE, FIREBASE_STORAGE } from "../../../firebaseConfig";
import {
  collection,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const editHandler = async (
  selectedImage,
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
  if (!name || !username) {
    setErrorMsg("Nama atau username dibutuhkan 🙏");
    openModal();
    return;
  }

  setLoading(true);

  let newProfile;

  if (selectedImage) {
    try {
      const blobImg = await fetch(selectedImage).then((response) =>
        response.blob()
      );

      const metadata = {
        contentType: "image/jpeg",
      };

      const imageName = selectedImage.match(/\/([^\/]+\.(jpeg|jpg|png))$/)[1];

      const storageRef = ref(FIREBASE_STORAGE, "profiles/" + imageName);
      const uploadTask = uploadBytesResumable(storageRef, blobImg, metadata);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              newProfile = downloadURL;
              resolve();
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  const collectionUserRef = collection(FIREBASE_FIRESTORE, "users");
  const collectionTweetRef = collection(FIREBASE_FIRESTORE, "tweets");
  const userUpdateData = {
    name,
    username,
    bio,
  };

  if (newProfile) {
    userUpdateData.profile = newProfile;
  }

  const usernameChanged = username !== loggedInUserData.username;

  try {
    const userUpdatePromise = updateDoc(
      doc(collectionUserRef, loggedInUserData.id),
      userUpdateData
    );

    if (usernameChanged || newProfile) {
      const tweetsQuerySnapshot = await getDocs(
        query(collectionTweetRef, where("userId", "==", loggedInUserData.id))
      );

      const tweetUpdatePromises = tweetsQuerySnapshot.docs.map(async (doc) => {
        const docRef = doc.ref;
        const updateData = {
          username,
        };

        if (newProfile) {
          updateData.profile = newProfile;
        }

        await updateDoc(docRef, updateData);
      });

      await Promise.all([userUpdatePromise, ...tweetUpdatePromises]);
    } else {
      await userUpdatePromise;
    }

    dispatch(setUpdateUser({ name, username, bio, newProfile }));
    goToPrevScreen();
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    setLoading(false);
  }
};


export default editHandler;
