import { View, Text, Button, ToastAndroid, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

import { TWEETS, PROFILE } from "../../constant";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "testing 📬",
      body: "agung ganteng",
    },
    trigger: {
      seconds: 1
    },
  });
}

const AddedDummyData = ({ navigation }) => {
  const handle = async () => {
    try {
      console.log("wait...");
      for (const data of TWEETS) {
        await addDoc(collection(FIREBASE_FIRESTORE, "tweets"), {
          userId: data.userId,
          profile: data.profile,
          username: data.username,
          date: data.date,
          tweet: data.tweet,
        });
      }

      console.log("success..");
    } catch (error) {
      console.error(error.code);
    }
  };

  function showToast() {
    ToastAndroid.show("AGUNG GANTENG!", ToastAndroid.SHORT);
  }
  
  return (
    <View className="flex-1 justify-center items-center">
      <Text>AGUNG</Text>
    </View>
  );
};

export default AddedDummyData;
