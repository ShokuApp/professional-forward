import React, { FC, useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { TableComponent } from "../components/allergen-notebook/table"

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
    textAlign: "center",
    marginBottom: 20
  },
  vertical: {
    width: 1000,
    height: 2000,
    paddingHorizontal: 20,
    backgroundColor: "red",
    marginBottom: 50
  },
  horizontal: {
    width: 800,
    height: 1800,
    backgroundColor: "yellow"
  },
  button: {
    borderRadius: 25,
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 25
  },
  textButton: {
    color: "white",
    fontSize: 17
  }
})

const AllergenNotebookPage: FC = () => {
  const [generation, setGeneration] = useState(false);

  return (
    <View style={styles.container}>
      {!generation
        ? 
          <Text style={styles.text}>Vous n'avez pas de cahier d'allergènes</Text>
        :
          <TableComponent />
      }
      <TouchableOpacity onPress={() => setGeneration(true)}>
        <View style={styles.button}>
          <Text style={styles.textButton}>Générer mon cahier d'allergènes</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AllergenNotebookPage;