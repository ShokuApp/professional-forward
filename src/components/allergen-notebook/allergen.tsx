import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Pictogram } from "../../models";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
  },
  pictogram: {
    height: 50,
    width: 50,
  },
  name: {
    textAlign: "center",
    paddingTop: 10,
  },
});

type AllergenProps = {
  allergen: Pictogram;
};

export const Allergen: FC<AllergenProps> = ({ allergen }: AllergenProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.pictogram} source={{ uri: allergen.image }} />
      <Text style={styles.name}>{allergen.name}</Text>
    </View>
  );
};
