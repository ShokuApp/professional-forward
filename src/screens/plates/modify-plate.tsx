import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { DishBloc, DishSetEvent, DishSetState } from "../../blocs";
import { DishRepository } from "../../repositories";
import { Dish } from "../../models";
import { BlocBuilder } from "@felangel/react-bloc";
import { ModifyPlateScreenRouteProps } from "../../navigator/navigator-type";
import { ModifyPlateForm } from "../../components/plates/modify-plate/modify-plate-form";

type ModifyPlateProps = {
  route: ModifyPlateScreenRouteProps;
};

const ModifyPlate: FC<ModifyPlateProps> = ({ route }) => {
  const dishBloc = new DishBloc(new DishRepository());
  const navigation = useNavigation();

  const modifyDish = (dish: Dish) => {
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
      builder={() => {
        return (
          <ModifyPlateForm callback={modifyDish} dish={route.params.dish} />
        );
      }}
    />
  );
};

export default ModifyPlate;
