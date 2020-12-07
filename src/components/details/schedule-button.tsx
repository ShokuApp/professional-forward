import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Icon } from "react-native-elements";

export const ScheduleButton: FC = () => {
  return (
    <View>
      <TouchableOpacity>
        <Text>Mes horaires</Text>
        <Icon type="antdesign" name="right" size={20} color="#2196F3" />
      </TouchableOpacity>
    </View>
  );
};
