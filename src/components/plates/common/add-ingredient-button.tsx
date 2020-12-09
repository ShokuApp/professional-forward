import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ingredient } from "../../../models";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  textAdd: {
    marginLeft: 10,
    color: "#9A9A9A",
    fontSize: 15,
  },
});
type IngredientButtonProps = {
  ingredients: Ingredient[];
  callback: (newIngredientsTab: Ingredient[]) => void;
};

export const AddIngredientButton: FC<IngredientButtonProps> = ({
  ingredients,
  callback,
}) => {
  const navigation = useNavigation();

  const navigateToAddIngredients = (
    ingredients: Ingredient[],
    callback: (newIngredientsTab: Ingredient[]) => void
  ) => {
    navigation.navigate("AddIngredientsPage", {
      onGoBack: (ingredients: Ingredient[]) => {
        callback(ingredients);
      },
      ingredientsRecipe: ingredients,
    });
  };
  return (
    <TouchableOpacity
      onPress={() => navigateToAddIngredients(ingredients, callback)}
      style={styles.container}
    >
      <Icon type="antdesign" name="plus" size={20} color="#2196F3" />
      <Text style={styles.textAdd}>Ajouter un ingrédient</Text>
    </TouchableOpacity>
  );
};
