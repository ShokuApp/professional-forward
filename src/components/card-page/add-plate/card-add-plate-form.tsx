import { CardAddPlateInput } from "./card-add-plate-input";
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Card, Dish } from "../../../models";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../common/button";
import { AddCardPlatesScreenRouteProps } from "../../../navigator/navigator-card-add-plate";
import { CardAddPlateToAdd } from "./card-add-plate-preview";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  button: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
  },
});

type Props = {
  availableDish: Dish[];
  route: AddCardPlatesScreenRouteProps;
  callback: (card: Card) => void;
};

const filteredList: (
  availableDish: Dish[],
  type: string,
  cardPlates: Dish[],
  platesToAdd: Dish[]
) => Dish[] = (availableDish, type, cardPlates, platesToAdd) => {
  const list = availableDish.filter(
    (dish) => cardPlates.find((item: Dish) => item.id === dish.id) === undefined
  );

  return list.filter((elem) => {
    return !platesToAdd.includes(elem);
  });
};

export const AddCardPlatesForm: FC<Props> = ({
  availableDish,
  route,
  callback,
}) => {
  const [platesToAdd, setPlatesToAdd] = useState<Dish[]>([]);
  const navigation = useNavigation();
  const addPlates = (item: Dish) => {
    setPlatesToAdd([...platesToAdd, item]);
  };

  const dishTypeList = availableDish.filter(
    (dish) => dish.type === route.params.type
  );

  const availableList = filteredList(
    dishTypeList,
    route.params.type,
    route.params.card.dishes,
    platesToAdd
  );

  const updateCard = (platesToAdd: Dish[], card: Card) => {
    const updateCard = card;

    updateCard.dishes = updateCard.dishes.concat(platesToAdd);
    return updateCard;
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always"
      >
        <CardAddPlateInput
          availablePlates={availableList}
          addPlates={addPlates}
        />
        <CardAddPlateToAdd plates={platesToAdd} setPlates={setPlatesToAdd} />
      </ScrollView>
      <View style={styles.button}>
        <Button
          label="Ajouter les plats"
          onPress={() => {
            const newCard = updateCard(platesToAdd, route.params.card);
            callback(newCard);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
