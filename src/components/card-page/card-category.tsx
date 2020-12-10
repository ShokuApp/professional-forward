import React, { FC } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Card, Dish } from "../../models/";
import { CategoryText } from "../common/category-text";
import AppendCategory from "./append-category";
import { CardBloc, CardSetEvent } from "../../blocs";
import { Icon } from "react-native-elements";
import { CategoryTitle } from "../common/category-title";

const styles = StyleSheet.create({
  cardCategoryContainer: {
    display: "flex",
    flexDirection: "column",
  },
});

export type CardCategoryProps = {
  title: string;
  type: string;
  category: string;
};

type Props = {
  callback: (card: Card, dishId: string) => void;
  props: CardCategoryProps;
  card: Card;
};

const CardCategory: FC<Props> = ({ callback, props, card }: Props) => {
  const alertConfirmation = (dish: Dish) => {
    Alert.alert(
      dish.name,
      "Supprimer ce plat de la carte ?",
      [
        {
          text: "Supprimer",
          onPress: () => {
            callback(card, dish.id);
          },
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
    <View style={styles.cardCategoryContainer}>
      <CategoryTitle label={props.title} />
      {card.dishes
        .filter((dish) => dish.type === props.type)
        .map((dish) => {
          return (
            <View key={dish.id}>
              <CategoryText
                label={dish.name}
                icon={
                  <Icon
                    type="antdesign"
                    name={"close"}
                    size={18}
                    color="#C6C6C8"
                    onPress={() => alertConfirmation(dish)}
                  />
                }
              />
            </View>
          );
        })}
      <AppendCategory label={props.category} type={props.type} card={card} />
    </View>
  );
};

export default CardCategory;
