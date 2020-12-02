import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Dish } from "../../models/dish";
import CardText from "./card-text";
import AppendCategory from "./append-category";

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
  props: CardCategoryProps;
  list: Dish[];
};

const CardCategory: FC<Props> = ({ props, list }: Props) => {
  return (
    <View style={styles.cardCategoryContainer}>
      <Text style={styles.cardCategoryType}>{props.title}</Text>
      {list.map((dish) => {
        return (
          <View key={dish.id}>
            <CardText
              label={dish.name}
              id={dish.id}
              icon={<AntDesign name={"close"} size={18} color="#C6C6C8" />}
            />
          </View>
        );
      })}
      <AppendCategory label={props.category} />
    </View>
  );
};

export default CardCategory;
