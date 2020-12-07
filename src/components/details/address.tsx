import React, { FC, Dispatch } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import CategoryTitle from "../common/category-title";

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 18,
    marginTop: 5,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#C6C6C8",
  },
});

type RestaurantTypeProps = {
  data: string;
  setData: Dispatch<React.SetStateAction<string>>;
  label: string;
};

export const Address: FC<RestaurantTypeProps> = ({
  data,
  setData,
  label,
}: RestaurantTypeProps) => {
  return (
    <View style={styles.container}>
      <CategoryTitle label={label}></CategoryTitle>
      <TextInput
        onChangeText={(text) => setData(text)}
        value={data}
        defaultValue={data}
        clearButtonMode="while-editing"
        style={styles.input}
      />
    </View>
  );
};
