import React, { FC, SetStateAction } from "react";
import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Ingredient } from "../../../models";
import { CategoryTitle } from "../../common/category-title";
import { CategoryText } from "../../common/category-text";
import { useNavigation } from "@react-navigation/native";

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

type PlateIngredientsProps = {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<SetStateAction<Ingredient[]>>;
  callback: (newIngredientsTab: Ingredient[]) => void;
};

type IngredientButtonProps = {
  ingredients: Ingredient[];
  callback: (newIngredientsTab: Ingredient[]) => void;
};

const AddIngredientButton: FC<IngredientButtonProps> = ({
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
    >
      <View style={styles.categoryAppend}>
        <Icon type="antdesign" name="plus" size={20} color="#2196F3" />
        <Text style={styles.textAdd}>Ajouter un ingrédient</Text>
      </View>
    </TouchableOpacity>
  );
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
