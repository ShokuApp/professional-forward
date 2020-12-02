import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import PlateDescription from "../components/plates/plates-description";
import SearchBar from "../components/plates/search-bar";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
});

const PlatesPage: FC = () => {
  return (
    <View style={styles.page}>
      <SearchBar />
      <PlateDescription key="1" />
      <PlateDescription key="2" />
    </View>
  );
};

export default PlatesPage;
