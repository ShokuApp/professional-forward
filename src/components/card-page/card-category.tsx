import React, { FC } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Card, Dish } from "../../models/";
import CategoryText from "../common/category-text";
import AppendCategory from "./append-category";
import { CardBloc, CardSetEvent } from "../../blocs";
import { Icon } from "react-native-elements";
import CategoryTitle from "../common/category-title";

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
  cardBloc: CardBloc;
  props: CardCategoryProps;
  card: Card;
};

const CardCategory: FC<Props> = ({ cardBloc, props, card }: Props) => {
  const deleteDish = (dishId: string) => {
    card.dishes = card.dishes.filter((dish) => dish.id !== dishId);
    cardBloc.add(new CardSetEvent(card.id, card));
  };

  const alertConfirmation = (dish: Dish) => {
    Alert.alert(
      dish.name,
      "Supprimer ce plat de la carte ?",
      [
        {
          text: "Supprimer",
          onPress: () => deleteDish(dish.id),
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
      <AppendCategory label={props.category} />
    </View>
  );
};

export default CardCategory;
