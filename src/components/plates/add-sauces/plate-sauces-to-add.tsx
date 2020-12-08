import React, { FC, SetStateAction } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { Sauce } from "../../../models/";
import CategoryTitle from "../../common/category-title";
import CategoryText from "../../common/category-text";

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
});

type PlateSaucesToAddProps = {
  sauces: Sauce[];
  setSauces: React.Dispatch<SetStateAction<Sauce[]>>;
};

export const PlateSaucesToAdd: FC<PlateSaucesToAddProps> = ({
  sauces,
  setSauces,
}: PlateSaucesToAddProps) => {
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
      <CategoryTitle label="Sauces à ajouter :" />
      {sauces &&
        sauces.map((sauce) => {
          return (
            <View key={sauce.id}>
              <CategoryText
                label={sauce.name}
                icon={
                  <Icon
                    type="antdesign"
                    name={"close"}
                    size={18}
                    color="#C6C6C8"
                    onPress={() => alertConfirmation(sauce)}
                  />
                }
              />
            </View>
          );
        })}
    </View>
  );
};
