import { PlateIngredientInput } from "./plate-ingredients-input";
import { PlateIngredientsToAdd } from "./plate-ingredients-to-add";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  LogBox,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Ingredient } from "../../../models";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Button } from "../../common/button";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  button: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
  },
});

type RootStackParamList = {
  AddIngredientsPage: {
    onGoBack: (ingredients: Ingredient[]) => void;
    ingredientsRecipe: Ingredient[];
  };
};

type AddIngredientScreenRouteProps = RouteProp<
  RootStackParamList,
  "AddIngredientsPage"
>;

type Props = {
  availableIngredients: Ingredient[];
  route: AddIngredientScreenRouteProps;
};

const filteredList: (
  availableList: Ingredient[],
  recipeList: Ingredient[],
  ingredientsToAdd: Ingredient[]
) => Ingredient[] = (availableList, recipeList, ingredientsToAdd) => {
  const list = availableList;

  if (recipeList) {
    for (let i = list.length - 1; i >= 0; i--) {
      for (let j = 0; j < recipeList.length; j++) {
        if (list[i] && list[i].id === recipeList[j].id) {
          list.splice(i, 1);
        }
      }
    }
  }

  return list.filter((elem) => {
    return !ingredientsToAdd.includes(elem);
  });
};

export const PlateIngredientsForm: FC<Props> = ({
  availableIngredients,
  route,
}) => {
  const [ingredientsToAdd, setIngredientsToAdd] = useState<Ingredient[]>([]);
  const navigation = useNavigation();
  const addIngredient = (item: Ingredient) => {
    setIngredientsToAdd([...ingredientsToAdd, item]);
  };
  const availableList = filteredList(
    availableIngredients,
    route.params.ingredientsRecipe,
    ingredientsToAdd
  );

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <PlateIngredientInput
          availableIngredients={availableList}
          addIngredient={addIngredient}
        />
        <PlateIngredientsToAdd
          ingredients={ingredientsToAdd}
          setIngredients={setIngredientsToAdd}
        />
      </ScrollView>
      <View style={styles.button}>
        <Button
          label="Créer"
          onPress={() => {
            route.params.onGoBack(ingredientsToAdd);
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
};
