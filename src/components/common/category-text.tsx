import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "@expo/vector-icons/build/createIconSet";

const styles = StyleSheet.create({
  elementName: {
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

type CategoryTextProps = {
  label: string;
  icon: React.ReactElement<Icon<string, string>>;
};

const CardText: FC<CategoryTextProps> = ({
  label,
  icon,
}: CategoryTextProps) => {
  return (
    <View style={styles.categoryStyle}>
      <Text style={styles.elementName}>{label}</Text>
      {icon}
    </View>
  );
};

export default CardText;
