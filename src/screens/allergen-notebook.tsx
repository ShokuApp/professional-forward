import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20
  },
  text: {
    fontSize: 17,
    color: "#C4C4C4",
    maxWidth: 210,
    flexWrap: "wrap",
    textAlign: "center"
  }
})

const AllergenNotebookPage: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vous n'avez pas de cahier d'allergènes</Text>
    </View>
  );
};

export default AllergenNotebookPage;