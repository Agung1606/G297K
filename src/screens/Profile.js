import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";

import { loggedInUser } from "../hooks";
import { Avatar } from "../components";
import { styles } from "../style/Global";

const Header = ({ username }) => {
  return (
    <View className={`flex-row ${styles.flexBetween} py-1 px-3`}>
      <Text className="font-InterBold text-xl tracking-wide">{username}</Text>
      <View className={`flex-row space-x-6`}>
        <TouchableOpacity>
          <EvilIcons name="plus" size={39} />
        </TouchableOpacity>
        <View>
          <TouchableOpacity>
            <SimpleLineIcons name="menu" size={28} />
            <View className={styles.unreadNotif}>
              <Text className="font-InterBold text-xs">1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Profile = () => {
  const { data } = loggedInUser();

  const info = [
    {
      number: 0,
      text: "Tweets",
    },
    {
      number: data.followers,
      text: "Followers",
    },
    {
      number: data.following,
      text: "Following",
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      <Header username={data.username} />
      {/* card informaion container */}
      <View className="px-3 mt-4">
        <View className={`flex-row ${styles.flexBetween} space-x-10`}>
          <Avatar imgUrl={{ uri: data.profile }} size={80} />
          <View className={`flex-1 flex-row ${styles.flexBetween}`}>
            {info.map((item) => (
              <View className={styles.flexCenter} key={item.text}>
                <Text className="font-InterSemiBold text-lg">
                  {item.number}
                </Text>
                <Text className="font-InterMedium">{item.text}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text className="font-InterBold">{data.name}</Text>
        <Text className="font-InterLight text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra,
          odio ac elementum laoreet, risus justo tincidunt sem, vel aliquet est
          lectus eget enim. Nulla lobortis tincidunt purus, id maximus lacus
          efficitur ut. Sed vitae hendrerit est. Sed convallis, mauris sit amet
          egestas scelerisque, nunc libero elementum sapien, id tempus sapien
          dolor eget est. Sed scelerisque, libero sed dapibus commodo, lectus
          justo lobortis ante, vel malesuada sapien sapien nec mauris. Phasellus
          condimentum tincidunt mauris, nec rutrum orci laoreet sed. Fusce non
          tortor vel nisi euismod tincidunt sed sed felis. Nam vitae erat vel
          odio semper malesuada at sit amet mauris. Integer tristique ultrices
          lacus, id luctus lectus maximus non. Nunc fermentum ligula lorem,
          vitae tempor tellus placerat ut. Mauris a tellus non tortor dictum
          malesuada vel eu neque.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
