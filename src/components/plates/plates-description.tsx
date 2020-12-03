import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import PlateComposition from "./plates-composition";
import { Dish } from "../../models/dish";
import { Sauce } from "../../models/sauce";

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

type Props = {
  dish: Dish;
};

const PlateDescription: FC<Props> = ({ dish }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text> </Text>
        <Text style={styles.label}>{dish.name}</Text>
        <SimpleLineIcons name="pencil" size={16} color="white" />
      </View>
      <View style={styles.composition}>
        <View style={{ marginBottom: 25 }}>
          <PlateComposition
            label={"Ingrédients:"}
            list={dish.ingredients}
          />
        </View>
        <View>
          <PlateComposition
            label={"Sauces:"}
            list={dish.sauces.length !== 0 ? dish.sauces[0].ingredients : []}
          />
        </View>
      </View>
    </View>
  );
};

export default PlateDescription;
