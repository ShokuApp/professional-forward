import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { DishBloc, DishSetEvent, DishSetState, DishState } from "../../blocs";
import { DishRepository } from "../../repositories";
import { Dish } from "../../models";
import { BlocBuilder } from "@felangel/react-bloc";
import { PlateForm } from "../../components/plates/add-plate/plate-form";

const AddPlate: FC = () => {
  const dishBloc = new DishBloc(new DishRepository());
  const navigation = useNavigation();

  const pushDish = (dish: Dish) => {
    dishBloc.add(new DishSetEvent(dish.id, dish));
  };

  return (
    <BlocBuilder
      bloc={dishBloc}
      condition={(_, currentState) => {
        if (currentState instanceof DishSetState) {
          navigation.goBack();
          return false;
        }
        return true;
      }}
      builder={(_: DishState) => {
        return <PlateForm callback={pushDish} />;
      }}
    />
  );
};

export default AddPlate;
