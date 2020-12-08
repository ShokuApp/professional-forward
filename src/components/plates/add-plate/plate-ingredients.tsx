import React, { FC, SetStateAction } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { CategoryTitle } from "../../common/category-title";
import { CategoryText } from "../../common/category-text";
import { AddIngredientButton } from "./add-ingredient-button";
import { Ingredient } from "../../../models";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
  },
});

type PlateIngredientsProps = {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<SetStateAction<Ingredient[]>>;
  callback: (newIngredientsTab: Ingredient[]) => void;
};

export const PlateIngredients: FC<PlateIngredientsProps> = ({
  ingredients,
  setIngredients,
  callback,
}: PlateIngredientsProps) => {
  const deleteIngredient = (ingredientId: string) => {
    setIngredients(
      ingredients.filter((ingredient) => ingredient.id !== ingredientId)
    );
  };

  const alertConfirmation = (ingredient: Ingredient) => {
    Alert.alert(
      ingredient.name,
      "Supprimer cet ingrédient du plat ?",
      [
        {
          text: "Supprimer",
          onPress: () => deleteIngredient(ingredient.id),
        },
        {
          text: "Annuler",
          onPress: () => null,
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <CategoryTitle label="Ingrédients:" />
      {ingredients.map((ingredient) => {
        return (
          <View key={ingredient.id}>
            <CategoryText
              label={ingredient.name}
              icon={
                <Icon
                  type="antdesign"
                  name={"close"}
                  size={18}
                  color="#C6C6C8"
                  onPress={() => alertConfirmation(ingredient)}
                />
              }
            />
          </View>
        );
      })}
      <AddIngredientButton ingredients={ingredients} callback={callback} />
    </View>
  );
};
