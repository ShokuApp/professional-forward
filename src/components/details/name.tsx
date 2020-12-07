import React, { FC, Dispatch } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import CategoryTitle from "../common/category-title";

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  textinput: {
    fontSize: 18,
    marginTop: 5,
    paddingHorizontal: 5,
  },
  border: {
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#C6C6C8",
  },
});

type RestaurantTypeProps = {
  restaurantName: string;
  setRestaurantName: Dispatch<React.SetStateAction<string>>;
};

export const RestaurantName: FC<RestaurantTypeProps> = ({
  restaurantName,
  setRestaurantName,
}: RestaurantTypeProps) => {
  return (
    <View style={styles.container}>
      <CategoryTitle label="Nom du restaurant :"></CategoryTitle>
      <View style={styles.border}>
        <TextInput
          onChangeText={(text) => setRestaurantName(text)}
          value={restaurantName}
          defaultValue={restaurantName}
          clearButtonMode="while-editing"
          style={styles.textinput}
        />
      </View>
    </View>
  );
};
