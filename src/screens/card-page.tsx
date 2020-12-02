import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dish } from "../models/dish";
import { Menu } from "../models/menu";
import { ScrollView } from "react-native-gesture-handler";
import CardCategory, {
  CardCategoryProps,
} from "../components/card-page/card-category";
import CardMenuCategory from "../components/card-page/card-menu-category";
import { BlocBuilder } from "@felangel/react-bloc";
import { CardBloc, CardGetEvent, CardGetState, CardState } from "../blocs";
import { CardRepository } from "../repositories";

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

const DISH_LIST: Dish[] = [
  {
    id: "1",
    name: "Carpaccio",
    type: "starter",
    description: "Un super Carpaccio",
    price: "7",
    ingredients: [],
    sauces: [],
  },
  {
    id: "2",
    name: "Salade de concombre",
    type: "starter",
    description: "La super salade",
    price: "10",
    ingredients: [],
    sauces: [],
  },
  {
    id: "3",
    name: "Entrecôte de boeuf",
    type: "plate",
    description: "Une entrecôte saignante",
    price: "100",
    ingredients: [],
    sauces: [],
  },
  {
    id: "4",
    name: "Pâtes bolognaise",
    type: "plate",
    description: "Des pâtes bolognaises",
    price: "100",
    ingredients: [],
    sauces: [],
  },
  {
    id: "5",
    name: "Glace à la vanille",
    type: "dessert",
    description: "Une super glace",
    price: "100",
    ingredients: [],
    sauces: [],
  },
  {
    id: "6",
    name: "Fondant au chocolat",
    type: "dessert",
    description: "Le meilleur fondant du monde",
    price: "100",
    ingredients: [],
    sauces: [],
  },
];

const CardPage: FC = () => {
  const Menu1: Menu = {
    id: "1",
    name: "Menu 1",
    price: "$",
    dishes: DISH_LIST,
  };

  const Menu2: Menu = {
    id: "2",
    name: "Menu 2",
    price: "$",
    dishes: DISH_LIST,
  };

  const menus = [Menu1, Menu2];
  const id = "004d8d6c-ecf5-4e90-98ca-92720510a857";
  const card = new CardBloc(new CardRepository());

  card.add(new CardGetEvent(id));

  return (
    <ScrollView style={styles.container}>
      <BlocBuilder
        bloc={card}
        builder={(state: CardState) => {
          if (!(state instanceof CardGetState)) {
            return <Text>Loading</Text>;
          }
          return (
            <View>
              {CARD_CATEGORY.map((card) => {
                return (
                  <View style={styles.cardTypeDescription} key={card.title}>
                    <CardCategory
                      props={card}
                      list={state.card.dishes.filter(
                        (dish) => dish.type === card.type
                      )}
                    />
                  </View>
                );
              })}
              <CardMenuCategory menus={state.card.menus} />
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default CardPage;
