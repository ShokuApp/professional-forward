import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
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
import { RestaurantRepository } from "../../repositories";
import { BlocBuilder } from "@felangel/react-bloc";
import { Schedule } from "../../components/details/schedule/schedule";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
});

const SchedulePage: FC = () => {
  const id = "999db654-b612-4ddd-a6de-1b1c7f745350";
  const restaurantBloc = new RestaurantBloc(new RestaurantRepository());

  restaurantBloc.add(new RestaurantGetEvent(id));
  return (
    <View style={styles.container}>
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
            <Schedule
              openingTime={(state as RestaurantGetState).restaurant.openingTime}
            />
          );
        }}
      />
    </View>
  );
};

export default SchedulePage;
