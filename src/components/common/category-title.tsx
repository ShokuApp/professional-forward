import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  categoryTitle: {
    marginBottom: 7,
    color: "#2196F3",
    fontSize: 16,
  },
});

type CategoryTitleProps = {
  label: string;
};

const CategoryTitle: FC<CategoryTitleProps> = ({
  label,
}: CategoryTitleProps) => {
  return <Text style={styles.categoryTitle}>{label}</Text>;
};

export default CategoryTitle;
