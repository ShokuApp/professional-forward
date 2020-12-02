import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Dish, Card } from "../../models/";
import CardText from "./card-text";
import AppendCategory from "./append-category";
import {
  CardBloc,
  CardSetEvent,
  CardState,
  CardGetState,
  CardErrorState,
  CardInitialState,
  CardLoadingState,
} from "../../blocs";
import { BlocBuilder } from "@felangel/react-bloc";

const styles = StyleSheet.create({
  cardCategoryContainer: {
    display: "flex",
    flexDirection: "column",
  },
  cardCategoryType: {
    marginBottom: 7,
    color: "#2196F3",
    fontSize: 16,
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

const deleteDish = (cardBloc: CardBloc, card: Card, dishId: string) => {
  card.dishes = card.dishes.filter((dish) => dish.id !== dishId);
  cardBloc.add(new CardSetEvent(card.id, card));
};

const CardCategory: FC<Props> = ({ cardBloc, props, card }: Props) => {
  return (
    <View style={styles.cardCategoryContainer}>
      <Text style={styles.cardCategoryType}>{props.title}</Text>
      {card.dishes
        .filter((dish) => dish.type === props.type)
        .map((dish) => {
          return (
            <View key={dish.id}>
              <CardText
                label={dish.name}
                id={dish.id}
                icon={
                  <AntDesign
                    name={"close"}
                    size={18}
                    color="#C6C6C8"
                    onPress={() => deleteDish(cardBloc, card, dish.id)}
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
