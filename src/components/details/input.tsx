import React, { FC, Dispatch } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { CategoryTitle } from "../common/category-title";

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
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
  keyboardCategory: string;
};

export const Input: FC<RestaurantTypeProps> = ({
  data,
  setData,
  label,
  keyboardCategory,
}: RestaurantTypeProps) => {
  return (
    <View style={styles.container}>
      <CategoryTitle label={label} />
      <TextInput
        keyboardType={keyboardCategory}
        onChangeText={(text) => setData(text)}
        value={data}
        defaultValue={data}
        style={styles.input}
      />
    </View>
  );
};
