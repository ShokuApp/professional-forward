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
    marginBottom: 7,
    color: "#2196F3",
    fontSize: 16,
  },
  cardTypeDescription: {
    marginBottom: 50,
  },
  dishName: {
    paddingLeft: 3,
    fontSize: 17,
  },
  generalStyle: {
    marginTop: 36,
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  categoryStyle: {
    borderBottomWidth: 0.5,
    marginRight: 13,
    borderBottomColor: "#C6C6C8",
    justifyContent: "center",
    height: 35,
  },
  cardCategoryContainer: {
    display: "flex",
    flexDirection: "column",
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
    <View style={styles.cardCategoryContainer}>
      <Text style={styles.cardCategoryType}>{props.title}</Text>
      {list.map((dish) => {
        return (
          <View style={styles.categoryStyle} key={dish.id}>
            <Text style={styles.dishName}>{dish.name}</Text>
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

  let fourthDish: Dish = {
    id: "4",
    name: "Entrecôte de boeuf",
    type: "plate",
    description: "Une entrecôte saignante",
    price: "100",
    ingredients: [],
    sauces: [],
  };
  let fifthDish: Dish = {
    id: "5",
    name: "Pâtes bolognaise",
    type: "plate",
    description: "Des pâtes bolognaises",
    price: "100",
    ingredients: [],
    sauces: [],
  };
  let sixthDish: Dish = {
    id: "6",
    name: "Glace à la vanille",
    type: "dessert",
    description: "Une super glace",
    price: "100",
    ingredients: [],
    sauces: [],
  };

  let list = [firstDish, secondDish, thirdDish, fourthDish, fifthDish];

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
    <View style={styles.generalStyle}>
      {CARD_CATEGORY.map((card) => {
        return (
          <View style={styles.cardTypeDescription} key={card.title}>
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
