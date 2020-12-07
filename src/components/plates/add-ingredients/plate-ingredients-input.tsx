import React, { FC, SetStateAction } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Ingredient } from "../../../models";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
    zIndex: 1000,
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  autocompleteContainer: {
    position: "relative",
    zIndex: 80,
  },
});

type PlateIngredientsInputProps = {
  availableIngredients: Ingredient[];
  addIngredient: (item: Ingredient) => void;
};

export const PlateIngredientInput: FC<PlateIngredientsInputProps> = ({
  availableIngredients,
  addIngredient,
}: PlateIngredientsInputProps) => {
  const [listIngredients, setListIngredients] = React.useState<Ingredient[]>(
    []
  );
  const [selectedValue, setSelectedValue] = React.useState({});

  const findIngredient = (query: string) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, "i");
      setListIngredients(
        availableIngredients.filter(
          (listIngredients) => listIngredients.name.search(regex) >= 0
        )
      );
    } else {
      setListIngredients([]);
    }
  };

  return (
    <View style={styles.container}>
      <Autocomplete
        data={listIngredients}
        defaultValue={
          JSON.stringify(selectedValue) === "{}" ? "" : selectedValue
        }
        placeholder={"Entrez votre ingrédient"}
        onChangeText={(text: string) => findIngredient(text)}
        renderItem={({ item }: Ingredient) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedValue(item.name);
                addIngredient(item);
                setListIngredients([]);
              }}
              delayPressIn={0}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
