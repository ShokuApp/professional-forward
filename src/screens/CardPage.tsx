import React, { FC } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dish } from "../models/dish";
import { Menu } from "../models/menu";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  cardCategoryType: {
    color: "#2196F3",
    fontSize: 14,
  },
});

type CardCategoryProps = {
  title: string;
  type: string;
};

const CARD_CATEGORY: CardCategoryProps[] = [
  {
    title: "Mes entrées:",
    type: "starter",
  },
  {
    title: "Mes plats:",
    type: "plate",
  },
  {
    title: "Mes desserts:",
    type: "dessert",
  },
];

type Props = {
  props: CardCategoryProps;
  list: Dish[];
};

type MenuProps = {
  menu: Menu;
};

const CardMenu: FC<MenuProps> = ({ menu }: MenuProps) => {
  return (
    <View>
      <Text>{menu.name}</Text>
      {menu.dishes.map((dish) => {
        return (
          <View key={dish.id}>
            <Text>{dish.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

type MenusProps = {
  menus: Menu[];
};

const CardMenuCategory: FC<MenusProps> = ({ menus }: MenusProps) => {
  const txt = "Mes menus:";

  return (
    <View>
      <Text style={styles.cardCategoryType}>{txt}</Text>
      {menus.map((menu) => {
        return (
          <View key={menu.id}>
            <CardMenu menu={menu} />
          </View>
        );
      })}
    </View>
  );
};

const CardCategory: FC<Props> = ({ props, list }: Props) => {
  return (
    <View>
      <Text style={styles.cardCategoryType}>{props.title}</Text>
      {list.map((dish) => {
        return (
          <View key={dish.id}>
            <Text>{dish.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const CardPage: FC = () => {
  const firstDish: Dish = {
    id: "1",
    name: "Carpaccio",
    type: "starter",
    description: "Un super Carpaccio",
    price: "7",
    ingredients: [],
    sauces: [],
  };
  const secondDish: Dish = {
    id: "2",
    name: "Salade de concombre",
    type: "starter",
    description: "La super salade",
    price: "10",
    ingredients: [],
    sauces: [],
  };
  const thirdDish: Dish = {
    id: "3",
    name: "Fondant au chocolat",
    type: "dessert",
    description: "Le meilleur fondant du monde",
    price: "100",
    ingredients: [],
    sauces: [],
  };

  const list = [firstDish, secondDish, thirdDish];

  const Menu1: Menu = {
    id: "1",
    name: "Menu 1",
    price: "$",
    dishes: list,
  };

  const list2 = [secondDish, thirdDish, firstDish];

  const Menu2: Menu = {
    id: "2",
    name: "Menu 2",
    price: "$",
    dishes: list2,
  };

  const menus = [Menu1, Menu2];

  return (
    <View>
      {CARD_CATEGORY.map((card) => {
        return (
          <View key={card.title}>
            <CardCategory
              props={card}
              list={list.filter((dish) => dish.type == card.type)}
            />
          </View>
        );
      })}
      <CardMenuCategory menus={menus} />
    </View>
  );
};

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
          },
        }}
      >
        <Stack.Screen name="Ma carte" component={CardPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
