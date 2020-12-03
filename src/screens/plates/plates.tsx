import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import PlateDescription from "../../components/plates/plates-description";
import SearchBar from "../../components/plates/search-bar";
import Data from "../../../data/dishes/data.json";
import {
  DishBloc,
  DishGetEvent,
  DishState,
  DishErrorState,
  DishLoadingState,
  DishInitialState,
  DishGetState,
} from "../../blocs";
import { DishRepository } from "../../repositories";
import { BlocBuilder } from "@felangel/react-bloc";
import { ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  arrowLeft: {
    paddingLeft: 15,
  },
});

const getPlatesIds: () => string[] = () => {
  const ids: string[] = [];

  Data.map((dish) => {
    ids.push(dish.id);
  });

  return ids;
};

const PlatesPage: FC = () => {
  const ids: string[] = getPlatesIds();
  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBar />
        {ids.map((id) => {
          const dishBloc = new DishBloc(new DishRepository());

          dishBloc.add(new DishGetEvent(id));
          return (
            <View key={id}>
              <BlocBuilder
                bloc={dishBloc}
                builder={(state: DishState) => {
                  if (state instanceof DishErrorState) {
                    return <Text>Error</Text>;
                  }
                  if (state instanceof DishInitialState) {
                    return <Text>Loading</Text>;
                  }
                  if (state instanceof DishLoadingState) {
                    return <Text>Loading</Text>;
                  }
                  return (
                    <PlateDescription dish={(state as DishGetState).dish} />
                  );
                }}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default PlatesPage;
