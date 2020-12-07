import React, { FC, useEffect } from "react";
import { LogBox, Text } from "react-native";
import { Ingredient } from "../../models/ingredient";
import { RouteProp } from "@react-navigation/native";
import { PlateIngredientsForm } from "../../components/plates/add-ingredients/plate-ingredients-form";
import {
  IngredientBloc,
  IngredientErrorState,
  IngredientListEvent,
  IngredientListState,
  IngredientState,
} from "../../blocs/ingredient";
import { IngredientRepository } from "../../repositories";
import { BlocBuilder } from "@felangel/react-bloc";

type RootStackParamList = {
  AddIngredientsPage: { onGoBack: (ingredients: Ingredient[]) => void };
};

type AddIngredientScreenRouteProps = RouteProp<
  RootStackParamList,
  "AddIngredientsPage"
>;

type Props = {
  route: AddIngredientScreenRouteProps;
};

const AddIngredients: FC<Props> = ({ route }) => {
  const ingredientBloc = new IngredientBloc(new IngredientRepository());
  ingredientBloc.add(new IngredientListEvent());

  useEffect(() => {
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
    ]);
  }, []);

  return (
    <BlocBuilder
      bloc={ingredientBloc}
      builder={(state: IngredientState) => {
        if (state instanceof IngredientErrorState) {
          return <Text>Error !</Text>;
        }
        if (state instanceof IngredientListState) {
          return (
            <PlateIngredientsForm
              availableIngredients={state.ingredients}
              route={route}
            />
          );
        }
        return <Text>Loading</Text>;
      }}
    />
  );
};

export default AddIngredients;
