import { View, Text, Button } from "react-native";
import React from "react";

import { TWEETS } from "../../constant";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const AddedDummyData = () => {
  const handle = async () => {
    try {
      console.log("wait...")
      for (const data of TWEETS) {
        await addDoc(collection(FIREBASE_FIRESTORE, "tweets"), {
          userId: data.userId,
          profile: data.profile,
          name: data.name,
          username: data.username,
          date: data.date,
          tweet: data.tweet,
          numberOfLikes: data.numberOfLikes,
          numberOfComments: data.numberOfComments,
        });
      }

      console.log("success..");
    } catch (error) {
      console.error(error.code);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Button title="add data" onPress={handle} />
    </View>
  );
};

export default AddedDummyData;
