import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  RestaurantBloc,
  RestaurantGetEvent,
  RestaurantGetState,
  RestaurantState,
  RestaurantErrorState,
  RestaurantLoadingState,
  RestaurantInitialState,
  RestaurantSetEvent,
  RestaurantSetState,
} from "../../blocs";
import { RestaurantRepository } from "../../repositories";
import { BlocBuilder } from "@felangel/react-bloc";
import { Restaurant } from "../../models";
import { ChangeSchedule } from "../../components/details/schedule/change-schedule";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
});

const ChangeSchedulePage: FC = () => {
  const id = "999db654-b612-4ddd-a6de-1b1c7f745350";
  const restaurantBloc = new RestaurantBloc(new RestaurantRepository());
  restaurantBloc.add(new RestaurantGetEvent(id));

  const editRestaurant = (id: string, restaurant: Partial<Restaurant>) => {
    restaurantBloc.add(new RestaurantSetEvent(id, restaurant));
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <BlocBuilder
        bloc={restaurantBloc}
        condition={(_, currentState) => {
          if (currentState instanceof RestaurantSetState) {
            navigation.goBack();
            return false;
          }
          return true;
        }}
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
            <ChangeSchedule
              callback={editRestaurant}
              restaurant={(state as RestaurantGetState).restaurant}
            />
          );
        }}
      />
    </View>
  );
};

export default ChangeSchedulePage;
