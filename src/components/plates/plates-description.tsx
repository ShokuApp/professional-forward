import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import PlateComposition from "./plates-composition";

const styles = StyleSheet.create({
  container: {
    width: "93%",
    minHeight: 145,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    marginVertical: 10,
  },
  header: {
    backgroundColor: "#2196F3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 33,
    alignItems: "center",
  },
  label: {
    fontSize: 17,
    color: "white",
  },
  composition: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
});

const PlateDescription: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text> </Text>
        <Text style={styles.label}>Pâtes carbonara</Text>
        <SimpleLineIcons name="pencil" size={16} color="white" />
      </View>
      <View style={styles.composition}>
        <View style={{ marginBottom: 25 }}>
          <PlateComposition
            label={"Ingrédients:"}
            list={["Ingredient 1", "Ingredient 2"]}
          />
        </View>
        <View>
          <PlateComposition
            label={"Sauces:"}
            list={["Ingredient 1", "Ingredient 2"]}
          />
        </View>
      </View>
    </View>
  );
};

export default PlateDescription;
