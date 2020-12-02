import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "@expo/vector-icons/build/createIconSet";

const styles = StyleSheet.create({
  dishName: {
    paddingLeft: 3,
    fontSize: 17,
  },
  categoryStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    marginRight: 13,
    borderBottomColor: "#C6C6C8",
    minHeight: 45,
  },
});

type CardTextProps = {
  label: string;
  id: string;
  icon: React.ReactElement<Icon<string, string>>;
};

const CardText: FC<CardTextProps> = ({ label, id, icon }: CardTextProps) => {
  return (
    <View style={styles.categoryStyle} key={id}>
      <Text style={styles.dishName}>{label}</Text>
      {icon}
    </View>
  );
};

export default CardText;
