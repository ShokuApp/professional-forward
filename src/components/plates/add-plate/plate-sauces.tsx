import React, { FC, SetStateAction } from "react";
import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Sauce } from "../../../models/sauce";
import CategoryTitle from "../../common/category-title";
import CategoryText from "../../common/category-text";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
  },
  categoryAppend: {
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
  sauceIngredients: {
    marginLeft: 45,
    marginRight: 13,
  },
  sauceItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#C6C6C8",
    minHeight: 35,
    justifyContent: "center",
  },
});

type PlateSaucesProps = {
  sauces: Sauce[];
  setSauces: React.Dispatch<SetStateAction<Sauce[]>>;
  callback: (newSaucesTab: Sauce[]) => void;
};

type SauceButtonProps = {
  sauces: Sauce[];
  callback: (newSaucesTab: Sauce[]) => void;
};

const AddSauceButton: FC<SauceButtonProps> = ({ sauces, callback }) => {
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
    <TouchableOpacity onPress={() => navigateToAddSauces(sauces, callback)}>
      <View style={styles.categoryAppend}>
        <Icon type="antdesign" name="plus" size={20} color="#2196F3" />
        <Text style={styles.textAdd}>Ajouter une sauce</Text>
      </View>
    </TouchableOpacity>
  );
};

export const PlateSauces: FC<PlateSaucesProps> = ({
  sauces,
  setSauces,
  callback,
}: PlateSaucesProps) => {
  const deleteSauce = (sauceId: string) => {
    setSauces(sauces.filter((sauce) => sauce.id !== sauceId));
  };

  const alertConfirmation = (sauce: Sauce) => {
    Alert.alert(
      sauce.name,
      "Supprimer cette sauce du plat ?",
      [
        {
          text: "Supprimer",
          onPress: () => deleteSauce(sauce.id),
        },
        {
          text: "Annuler",
          onPress: () => null,
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <CategoryTitle label="Sauces :" />
      {sauces.map((sauce) => {
        return (
          <View key={sauce.id}>
            <CategoryText
              label={sauce.name}
              icon={
                <Icon
                  type="antdesign"
                  name={"close"}
                  size={15}
                  color="#C6C6C8"
                  onPress={() => alertConfirmation(sauce)}
                />
              }
            />
            <View style={styles.sauceIngredients}>
              {sauce.ingredients.map((ingredient) => {
                return (
                  <View style={styles.sauceItem} key={ingredient.id}>
                    <Text>{ingredient.name}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
      <AddSauceButton sauces={sauces} callback={callback} />
    </View>
  );
};
