import React, { FC, SetStateAction } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  InteractionManager,
} from "react-native";
import { Icon } from "react-native-elements";
import { Ingredient } from "../../../models/ingredient";
import CategoryTitle from "../../common/category-title";
import CategoryText from "../../common/category-text";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
  },
});

type PlateIngredientsProps = {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<SetStateAction<Ingredient[]>>;
};

const PlateIngredients: FC<PlateIngredientsProps> = ({
  ingredients,
  setIngredients,
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
    </View>
  );
};

export default PlateIngredients;
