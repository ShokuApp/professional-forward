import React, { FC, useEffect } from "react";
import { LogBox, Text } from "react-native";
import { PlateIngredientsForm } from "../../components/plates/add-ingredients/plate-ingredients-form";
import {
  IngredientBloc,
  IngredientErrorState,
  IngredientListEvent,
  IngredientListState,
  IngredientState,
} from "../../blocs";
import { IngredientRepository } from "../../repositories";
import { BlocBuilder } from "@felangel/react-bloc";
import { AddIngredientScreenRouteProps } from "../../navigator/navigator-type";

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
