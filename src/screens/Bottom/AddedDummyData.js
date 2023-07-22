import { View, Text, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

import { TWEETS, PROFILE } from "../../constant";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Open the notification to read them all",
      sound: "email-sound.wav", // <- for Android below 8.0
    },
    trigger: {
      seconds: 2,
      channelId: "new-emails", // <- for Android 8.0+, see definition above
    },
  });
}

const AddedDummyData = () => {
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

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) =>
        setNotification(notification)
      );
    responseListener.current = Notifications.addNotificationReceivedListener(
      (response) => console.log(response)
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      {/* <View className="items-center justify-center">
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View> */}
      <Button
        title="Press to schedule a notification"
        onPress={async () => await schedulePushNotification()}
      />
    </View>
  );
};

export default AddedDummyData;
