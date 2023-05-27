import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";

import { styles } from "../style/Global";

const Interaction = () => {
  return (
    <View className={`flex-row ${styles.flexBetween}`}>
      {/* like */}
      <View className={`${styles.iconInteractionWrapper}`}>
        <TouchableOpacity>
          <FontAwesome name="heart-o" size={22} color="#7d7d7d" />
        </TouchableOpacity>
        <Text className="text-[#7d7d7d]">0</Text>
      </View>
      {/* comment */}
      <View className={`${styles.iconInteractionWrapper}`}>
        <TouchableOpacity>
          <FontAwesome name="comment-o" size={22} color="#7d7d7d" />
        </TouchableOpacity>
        <Text className="text-[#7d7d7d]">0</Text>
      </View>
      {/* share */}
      <TouchableOpacity>
          <Feather name="share-2" size={22} color="#7d7d7d" />
      </TouchableOpacity>
    </View>
  );
};

export { Interaction };
