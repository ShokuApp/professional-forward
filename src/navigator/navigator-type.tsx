import { RouteProp } from "@react-navigation/native";
import { Sauce, Ingredient } from "../models";

type RootStackParamList = {
  AddSaucesPage: {
    onGoBack: (sauces: Sauce[]) => void;
    saucesRecipe: Sauce[];
  };
  AddIngredientsPage: {
    onGoBack: (ingredients: Ingredient[]) => void;
    ingredientsRecipe: Ingredient[];
  };
};

export type AddIngredientScreenRouteProps = RouteProp<
  RootStackParamList,
  "AddIngredientsPage"
>;

export type AddSauceScreenRouteProps = RouteProp<
  RootStackParamList,
  "AddSaucesPage"
>;
