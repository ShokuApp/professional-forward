import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
});

export const ChangeScheduleIcon: FC = () => {
  const { navigate } = useNavigation();

  return (
    <Icon
      size={20}
      style={styles.container}
      type="simple-line-icon"
      name="pencil"
      onPress={() => navigate("changeMySchedule")}
    />
  );
};
