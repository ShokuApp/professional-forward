import React, { FC } from "react";
import {
  CardBloc,
  CardSetEvent,
  CardSetState,
  DishBloc,
  DishErrorState,
  DishListEvent,
  DishListState,
  DishState,
} from "../../blocs";
import { CardRepository, DishRepository } from "../../repositories";
import { Text } from "react-native";
import { BlocBuilder } from "@felangel/react-bloc";
import { AddCardPlatesScreenRouteProps } from "../../navigator/navigator-card-add-plate";
import { AddCardPlatesForm } from "../../components/card-page/add-plate/card-add-plate-form";
import { Card } from "../../models";
import { useNavigation } from "@react-navigation/native";

type AddCardPlateProps = {
  route: AddCardPlatesScreenRouteProps;
};

const AddCardPlate: FC<AddCardPlateProps> = ({ route }) => {
  const dishBloc = new DishBloc(new DishRepository());
  const cardBloc = new CardBloc(new CardRepository());
  const navigation = useNavigation();

  dishBloc.add(new DishListEvent());
  const modifyCard = (card: Card) => {
    cardBloc.add(new CardSetEvent(card.id, card));
  };

  return (
    <BlocBuilder
      bloc={cardBloc}
      condition={(_, currentState) => {
        if (currentState instanceof CardSetState) {
          navigation.goBack();
          return false;
        }
        return true;
      }}
      builder={() => {
        return (
          <BlocBuilder
            bloc={dishBloc}
            builder={(state: DishState) => {
              if (state instanceof DishErrorState) {
                return <Text>Error !</Text>;
              }
              if (state instanceof DishListState) {
                return (
                  <AddCardPlatesForm
                    availableDish={state.dishes}
                    route={route}
                    callback={modifyCard}
                  />
                );
              }
              return <Text>Loading</Text>;
            }}
          />
        );
      }}
    />
  );
};

export default AddCardPlate;
