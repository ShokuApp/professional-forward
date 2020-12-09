import React, { FC } from "react";
import { Text } from "react-native";
import { RestaurantRepository } from "../../repositories";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  RestaurantBloc,
  RestaurantGetEvent,
  RestaurantGetState,
  RestaurantState,
  RestaurantErrorState,
  RestaurantLoadingState,
  RestaurantInitialState,
  RestaurantSetEvent,
} from "../../blocs";
import { Details } from "../../components/details/details";
import { Restaurant } from "../../models";

const RestaurantPage: FC = () => {
  const id = "999db654-b612-4ddd-a6de-1b1c7f745350";
  const restaurantBloc = new RestaurantBloc(new RestaurantRepository());

  restaurantBloc.add(new RestaurantGetEvent(id));

  const editRestaurant = (id: string, restaurant: Partial<Restaurant>) => {
    restaurantBloc.add(new RestaurantSetEvent(id, restaurant));
  };

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
          <Details
            restaurant={(state as RestaurantGetState).restaurant}
            callback={editRestaurant}
          />
        );
      }}
    />
  );
};

export default RestaurantPage;
