import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import PlateDescription from "../components/plates/plates-description";
import SearchBar from "../components/plates/search-bar";
import {
  DishBloc,
  DishGetEvent,
  DishState,
  DishErrorState,
  DishLoadingState,
  DishInitialState,
  DishGetState,
  DishListEvent,
  DishListState,
} from "../blocs";
import { DishRepository } from "../repositories";
import { BlocBuilder } from "@felangel/react-bloc";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
});

const PlatesPage: FC = () => {
  const dishBloc = new DishBloc(new DishRepository());

  dishBloc.add(new DishListEvent());

  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBar />
        <BlocBuilder
          bloc={dishBloc}
          builder={(state: DishState) => {
            if (state instanceof DishErrorState) {
              return <Text>Error</Text>;
            }
            if (state instanceof DishListState) {
              return (
                <View>
                  {state.dishes.map((dish) => {
                    return (
                      <View key={dish.id}>
                        <PlateDescription dish={dish} />
                      </View>
                    );
                  })}
                </View>
              );
            }
            return <Text>Loading</Text>;
          }}
        />
      </View>
    </ScrollView>
  );
};

export default PlatesPage;
