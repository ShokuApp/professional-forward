import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import SchedulePage from "../../../screens/details/schedule-page";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#C6C6C8",
    marginHorizontal: 10,
  },
  text: {
    fontSize: 17,
    color: "#2196F3",
    paddingVertical: 5,
  },
});

export const ScheduleButton: FC = () => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate("mySchedule")}
    >
      <Text style={styles.text}>Mes horaires</Text>
      <Icon type="antdesign" name="right" size={20} color="#AAAAAA" />
    </TouchableOpacity>
  );
};
