import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import PlateComposition from "./plates-composition";
import { Dish } from "../../models";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: (93 * width) / 100,
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
    minHeight: 33,
    alignItems: "center",
    paddingVertical: 2,
  },
  titleContainer: {
    maxWidth: (65 * width) / 100,
  },
  label: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
  composition: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  sauce: {
    marginTop: 25,
  },
});

type Props = {
  dish: Dish;
};

const PlateDescription: FC<Props> = ({ dish }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View></View>
        <View style={styles.titleContainer}>
          <Text style={styles.label}>{dish.name}</Text>
        </View>
        <SimpleLineIcons name="pencil" size={16} color="white" />
      </View>
      <View style={styles.composition}>
        <View>
          <PlateComposition label={"Ingrédients :"} list={dish.ingredients} />
        </View>
        {dish.sauces.length !== 0 ? (
          <View style={styles.sauce}>
            <PlateComposition
              label={"Sauces :"}
              list={dish.sauces[0].ingredients}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default PlateDescription;
