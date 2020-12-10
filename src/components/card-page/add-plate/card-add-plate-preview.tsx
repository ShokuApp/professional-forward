import React, { FC, SetStateAction } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { Dish } from "../../../models/Dish";
import { CategoryTitle } from "../../common/category-title";
import { CategoryText } from "../../common/category-text";

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

type PlatePlatesToAddProps = {
  plates: Dish[];
  setPlates: React.Dispatch<SetStateAction<Dish[]>>;
};

export const CardAddPlateToAdd: FC<PlatePlatesToAddProps> = ({
  plates,
  setPlates,
}: PlatePlatesToAddProps) => {
  const deletePlate = (plateId: string) => {
    setPlates(plates.filter((plate) => plate.id !== plateId));
  };

  const alertConfirmation = (plate: Dish) => {
    Alert.alert(
      plate.name,
      "Supprimer ce plat ?",
      [
        {
          text: "Supprimer",
          onPress: () => deletePlate(plate.id),
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
      <CategoryTitle label="Plats à ajouter :" />
      {plates &&
        plates.map((plate) => {
          return (
            <CategoryText
              label={plate.name}
              icon={
                <Icon
                  type="antdesign"
                  name={"close"}
                  size={18}
                  color="#C6C6C8"
                  onPress={() => alertConfirmation(plate)}
                />
              }
              key={plate.id}
            />
          );
        })}
    </View>
  );
};
