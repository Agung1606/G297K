import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

import { Header } from "../../components";

const SETTINGOPTIONS = [
  {
    id: 1,
    title: "Bagaimana Anda menggunakan G297K",
    data: [
      {
        id: 1,
        text: "Notifikasi",
        icon: <Entypo name="bell" size={22} />,
      },
      {
        id: 2,
        text: "Waktu yang dihabiskan",
        icon: <MaterialIcons name="access-time" size={22} />,
      },
    ],
  },
];

const Settings = () => {
  return (
    <SafeAreaView>
      <Header text={"Pengaturan dan privasi"} />
      {SETTINGOPTIONS.map((section) => (
        <View key={section.id}>
          <Text>{section.title}</Text>
          {section.data.map((item) => (
            <View key={item.id}>
              {item.icon}
              <Text>{item.text}</Text>
            </View>
          ))}
        </View>
      ))}
    </SafeAreaView>
  );
};

export default Settings;
