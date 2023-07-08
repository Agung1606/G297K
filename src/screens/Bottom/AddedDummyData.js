import { View, Text, Button } from "react-native";
import React from "react";

import { TWEETS } from "../../constant";

import { FIREBASE_FIRESTORE } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const agungTweets = [
  {
    userId: "tLw9Ujv85KLwD0Fsid0L",
    name: "AGUNG SAPUTRA",
    username: "agngsptra._",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/g297k-dd26d.appspot.com/o/profiles%2FdefaultProfile.jpg?alt=media&token=00865e31-d1d6-4556-9130-fcd2a3b8ea6d",
    tweet: "test 1",
    date: "Sat Jul 1 2023 06:56:10 GMT+0700",
    numberOfLikes: 0,
    numberOfComments: 0,
  },
  {
    userId: "tLw9Ujv85KLwD0Fsid0L",
    name: "AGUNG SAPUTRA",
    username: "agngsptra._",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/g297k-dd26d.appspot.com/o/profiles%2FdefaultProfile.jpg?alt=media&token=00865e31-d1d6-4556-9130-fcd2a3b8ea6d",
    tweet: "test 2",
    date: "Sat Jul 1 2023 07:56:10 GMT+0700",
    numberOfLikes: 0,
    numberOfComments: 0,
  },
  {
    userId: "tLw9Ujv85KLwD0Fsid0L",
    name: "AGUNG SAPUTRA",
    username: "agngsptra._",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/g297k-dd26d.appspot.com/o/profiles%2FdefaultProfile.jpg?alt=media&token=00865e31-d1d6-4556-9130-fcd2a3b8ea6d",
    tweet: "test 3",
    date: "Sat Jul 1 2023 08:56:10 GMT+0700",
    numberOfLikes: 0,
    numberOfComments: 0,
  },
  {
    userId: "tLw9Ujv85KLwD0Fsid0L",
    name: "AGUNG SAPUTRA",
    username: "agngsptra._",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/g297k-dd26d.appspot.com/o/profiles%2FdefaultProfile.jpg?alt=media&token=00865e31-d1d6-4556-9130-fcd2a3b8ea6d",
    tweet: "test 4",
    date: "Sat Jul 1 2023 08:56:10 GMT+0700",
    numberOfLikes: 0,
    numberOfComments: 0,
  },
  {
    userId: "tLw9Ujv85KLwD0Fsid0L",
    name: "AGUNG SAPUTRA",
    username: "agngsptra._",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/g297k-dd26d.appspot.com/o/profiles%2FdefaultProfile.jpg?alt=media&token=00865e31-d1d6-4556-9130-fcd2a3b8ea6d",
    tweet: "test 5",
    date: "Sat Jul 1 2023 08:56:10 GMT+0700",
    numberOfLikes: 0,
    numberOfComments: 0,
  },
];

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
