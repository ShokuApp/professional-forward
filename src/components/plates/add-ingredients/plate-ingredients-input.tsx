import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Ingredient } from "../../../models";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
    zIndex: 1000,
    flex: 1,
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
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
  const [listIngredients, setListIngredients] = useState<Ingredient[]>([]);
  const [text, setText] = useState("");

  const findIngredient = (query: string) => {
    setText(query);
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
        value={text}
        placeholder={"Entrez votre ingrédient"}
        placeholderTextColor="#C6C6C8"
        onChangeText={(text: string) => findIngredient(text)}
        listStyle={{ maxHeight: 350 }}
        flatListProps={{ nestedScrollEnabled: true }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                addIngredient(item);
                setListIngredients([]);
                setText("");
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
