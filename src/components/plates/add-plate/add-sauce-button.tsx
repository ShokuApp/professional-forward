import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Sauce } from "../../../models";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  textAdd: {
    marginLeft: 10,
    color: "#9A9A9A",
    fontSize: 15,
  },
});
type SauceButtonProps = {
  sauces: Sauce[];
  callback: (newSaucesTab: Sauce[]) => void;
};

export const AddSauceButton: FC<SauceButtonProps> = ({ sauces, callback }) => {
  const navigation = useNavigation();

  const navigateToAddSauces = (
    sauces: Sauce[],
    callback: (newSaucesTab: Sauce[]) => void
  ) => {
    navigation.navigate("AddSaucesPage", {
      onGoBack: (sauces: Sauce[]) => {
        callback(sauces);
      },
      saucesRecipe: sauces,
    });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigateToAddSauces(sauces, callback)}
    >
      <Icon type="antdesign" name="plus" size={20} color="#2196F3" />
      <Text style={styles.textAdd}>Ajouter une sauce</Text>
    </TouchableOpacity>
  );
};
