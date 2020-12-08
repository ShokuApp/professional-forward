import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import PlateDescription from "../../components/plates/plates-description";
import SearchBar from "../../components/plates/search-bar";
import {
  DishBloc,
  DishErrorState,
  DishListEvent,
  DishListState,
  DishState,
} from "../../blocs";
import { DishRepository } from "../../repositories";
import { BlocBuilder } from "@felangel/react-bloc";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  content: {
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

const PlatesPage: FC = () => {
  const dishBloc = new DishBloc(new DishRepository());
  useIsFocused();

  dishBloc.add(new DishListEvent());

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
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
                    return <PlateDescription key={dish.id} dish={dish} />;
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
