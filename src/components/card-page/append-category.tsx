import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const styles = StyleSheet.create({
  categoryAppend: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  textAdd: {
    marginLeft: 10,
    color: "#9A9A9A",
    fontSize: 15,
  },
});

type AppendCategoryProps = {
  label: string;
};

const AppendCategory: FC<AppendCategoryProps> = ({
  label,
}: AppendCategoryProps) => {
  return (
    <View style={styles.categoryAppend}>
      <AntDesign name="plus" size={20} color="#2196F3" />
      <Text style={styles.textAdd}>Ajouter {label}</Text>
    </View>
  );
};

export default AppendCategory;
