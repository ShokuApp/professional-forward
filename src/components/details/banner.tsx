import React, { FC } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
});
type BannerProps = {
  imageURL: string;
};

export const Banner: FC<BannerProps> = ({ imageURL }: BannerProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imageURL }} />
    </View>
  );
};
