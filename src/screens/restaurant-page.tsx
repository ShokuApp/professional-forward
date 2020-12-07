import React, { FC, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { RestaurantRepository } from "../repositories";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  RestaurantBloc,
  RestaurantGetEvent,
  RestaurantGetState,
  RestaurantState,
  RestaurantErrorState,
  RestaurantLoadingState,
  RestaurantInitialState,
} from "../blocs";
import { Details } from "../components/details/details";

const RestaurantPage: FC = () => {
  const id = "999db654-b612-4ddd-a6de-1b1c7f745350";
  const restaurantBloc = new RestaurantBloc(new RestaurantRepository());

  restaurantBloc.add(new RestaurantGetEvent(id));
  return (
    <BlocBuilder
      bloc={restaurantBloc}
      builder={(state: RestaurantState) => {
        if (state instanceof RestaurantErrorState) {
          return <Text>Error</Text>;
        }
        if (state instanceof RestaurantInitialState) {
          return <Text>Loading</Text>;
        }
        if (state instanceof RestaurantLoadingState) {
          return <Text>Loading</Text>;
        }
        return (
          <Details restaurant={(state as RestaurantGetState).restaurant} />
        );
      }}
    />
  );
};

export default RestaurantPage;
