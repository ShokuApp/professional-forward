import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { ChangeScheduleDayRouteProps } from "../../navigator/navigator-change-schedule-day";
import { Restaurant } from "../../models";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  RestaurantBloc,
  RestaurantState,
  RestaurantSetEvent,
  RestaurantSetState,
} from "../../blocs";
import { RestaurantRepository } from "../../repositories";
import { ChangeScheduleDay } from "../../components/details/schedule/change-schedule-day";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
});

type ChangeScheduleDayProps = {
  route: ChangeScheduleDayRouteProps;
};

export const ChangeScheduleDayPage: FC<ChangeScheduleDayProps> = ({
  route,
}: ChangeScheduleDayProps) => {
  const id = "999db654-b612-4ddd-a6de-1b1c7f745350";
  const restaurantBloc = new RestaurantBloc(new RestaurantRepository());

  const editRestaurant = (id: string, restaurant: Partial<Restaurant>) => {
    restaurantBloc.add(new RestaurantSetEvent(id, restaurant));
  };
  const navigation = useNavigation();
  const { day, schedule } = route.params;
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
          return (
            <ChangeScheduleDay
              day={day}
              id={id}
              callback={editRestaurant}
              oldOpeningTime={schedule}
            />
          );
        }}
      />
    </View>
  );
};
