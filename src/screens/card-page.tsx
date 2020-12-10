import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CardCategory, {
  CardCategoryProps,
} from "../components/card-page/card-category";
import CardMenuCategory from "../components/card-page/card-menu-category";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  CardBloc,
  CardErrorState,
  CardGetEvent,
  CardGetState,
  CardInitialState,
  CardLoadingState,
  CardSetEvent,
  CardState,
} from "../blocs";
import { CardRepository } from "../repositories";
import { useIsFocused } from "@react-navigation/native";
import { Card } from "../models";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const styles = StyleSheet.create({
  container: {
    paddingTop: 36,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    paddingLeft: 10,
  },
  cardTypeDescription: {
    marginBottom: 50,
  },
});

const CARD_CATEGORY: CardCategoryProps[] = [
  {
    title: "Mes entrées:",
    type: "starter",
    category: "une entrée",
  },
  {
    title: "Mes plats:",
    type: "plate",
    category: "un plat",
  },
  {
    title: "Mes desserts:",
    type: "dessert",
    category: "un dessert",
  },
];

const CardPage: FC = () => {
  const id = "46087e3d-1943-4e57-9ced-2af2291e1f91";
  const cardBloc = new CardBloc(new CardRepository());
  const isFocused = useIsFocused();

  cardBloc.add(new CardGetEvent(id));

  const deleteDish = (card: Card, dishId: string) => {
    card.dishes = card.dishes.filter((dish) => dish.id !== dishId);
    cardBloc.add(new CardSetEvent(card.id, card));
  };

  return (
    <ScrollView style={styles.container}>
      <BlocBuilder
        bloc={cardBloc}
        key={uuidv4()}
        builder={(state: CardState) => {
          if (state instanceof CardErrorState) {
            return <Text>Error</Text>;
          }
          if (state instanceof CardInitialState) {
            return <Text>Loading</Text>;
          }
          if (state instanceof CardLoadingState) {
            return <Text>Loading</Text>;
          }
          return (
            <View>
              {CARD_CATEGORY.map((cardCategory) => {
                return (
                  <View
                    style={styles.cardTypeDescription}
                    key={cardCategory.title}
                  >
                    <CardCategory
                      callback={deleteDish}
                      props={cardCategory}
                      card={(state as CardGetState).card}
                    />
                  </View>
                );
              })}
              <CardMenuCategory menus={(state as CardGetState).card.menus} />
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default CardPage;
