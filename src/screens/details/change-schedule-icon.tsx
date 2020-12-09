import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
});
export const ChangeScheduleIcon: FC = () => {
  return (
    <Icon
      size={20}
      style={styles.container}
      type="simple-line-icon"
      name="pencil"
      onPress={() => alert("Redirect to modify schedule")}
    />
  );
};
