import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";

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

type AllergenNameProps = {
  label: string;
  path: ImageSourcePropType;
};

export const AllergenName: FC<AllergenNameProps> = ({
  label,
  path,
}: AllergenNameProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.pictogram} source={path} />
      <Text style={styles.name}>{label}</Text>
    </View>
  );
};
