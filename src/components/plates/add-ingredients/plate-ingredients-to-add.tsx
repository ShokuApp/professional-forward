import React, { FC, SetStateAction } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { Ingredient } from "../../../models";
import { CategoryTitle } from "../../common/category-title";
import { CategoryText } from "../../common/category-text";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
  },
  categoryAppend: {
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

type PlateIngredientsToAddProps = {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<SetStateAction<Ingredient[]>>;
};

export const PlateIngredientsToAdd: FC<PlateIngredientsToAddProps> = ({
  ingredients,
  setIngredients,
}: PlateIngredientsToAddProps) => {
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
      <CategoryTitle label="Ingrédients à ajouter :" />
      {ingredients &&
        ingredients.map((ingredient) => {
          return (
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
              key={ingredient.id}
            />
          );
        })}
    </View>
  );
};
