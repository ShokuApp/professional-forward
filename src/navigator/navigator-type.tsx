import { RouteProp } from "@react-navigation/native";
import { Sauce, Ingredient, Dish } from "../models";

type RootStackParamList = {
  AddSaucesPage: {
    onGoBack: (sauces: Sauce[]) => void;
    saucesRecipe: Sauce[];
  };
  AddIngredientsPage: {
    onGoBack: (ingredients: Ingredient[]) => void;
    ingredientsRecipe: Ingredient[];
  };
  ModifyPlatePage: {
    dish: Dish;
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

export type ModifyPlateScreenRouteProps = RouteProp<
  RootStackParamList,
  "ModifyPlatePage"
>;
