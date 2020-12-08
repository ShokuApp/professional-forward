import React, { FC, Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CategoryText from "../../common/category-text";
import { Sauce } from "../../../models";
import { Icon } from "react-native-elements";
import { alertConfirmation } from "../add-plate/plate-sauces";

const styles = StyleSheet.create({
  container: {
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

type SauceItemProps = {
  sauce: Sauce;
  sauces: Sauce[];
  setSauces: Dispatch<SetStateAction<Sauce[]>>;
};

export const SauceItem: FC<SauceItemProps> = ({
  sauce,
  sauces,
  setSauces,
}: SauceItemProps) => {
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
    <View>
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
      <View style={styles.container}>
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
};
