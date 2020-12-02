import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dish } from "../models/dish";
import { Menu } from "../models/menu";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "@expo/vector-icons/build/createIconSet";

const styles = StyleSheet.create({
  container: {
    paddingTop: 36,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    paddingLeft: 10,
  },
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
  categoryStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    marginRight: 13,
    borderBottomColor: "#C6C6C8",
    minHeight: 45,
  },
  cardCategoryContainer: {
    display: "flex",
    flexDirection: "column",
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
  menuDishes: {
    marginLeft: 45,
    marginRight: 13,
  },
  menuItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#C6C6C8",
    minHeight: 35,
    justifyContent: "center",
  },
});

type CardCategoryProps = {
  title: string;
  type: string;
  category: string;
};

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

type AppendCategoryProps = {
  label: string;
};

const AppendCategory: FC<AppendCategoryProps> = ({label}: AppendCategoryProps) => {
  return (
    <View style={styles.categoryAppend}>
      <AntDesign name="plus" size={20} color="#2196F3" />
      <Text style={styles.textAdd}>Ajouter {label}</Text>
    </View>
  );
};

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
      <CardText
        label={menu.name}
        id={menu.id}
        icon={<SimpleLineIcons name="pencil" size={15} color="#C6C6C8" />}
      />
      <View style={styles.menuDishes}>
        {menu.dishes.map((dish) => {
          return (
            <View style={styles.menuItem} key={dish.id}>
              <Text>{dish.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

type MenusProps = {
  menus: Menu[];
};

const CardMenuCategory: FC<MenusProps> = ({ menus }: MenusProps) => {
  const txt = "Mes menus:";

  return (
    <View style={{ marginBottom: 36 }}>
      <Text style={styles.cardCategoryType}>{txt}</Text>
      {menus.map((menu) => {
        return (
          <View key={menu.id}>
            <CardMenu menu={menu} />
          </View>
        );
      })}
      <AppendCategory label={"un menu"} />
    </View>
  );
};

type CardTextProps = {
  label: string;
  id: string;
  icon: React.ReactElement<Icon<string, string>>;
};

const CardText: FC<CardTextProps> = ({ label, id, icon }: CardTextProps) => {
  return (
    <View style={styles.categoryStyle} key={id}>
      <Text style={styles.dishName}>{label}</Text>
      {icon}
    </View>
  );
};

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

  return (
    <ScrollView style={styles.container}>
      {CARD_CATEGORY.map((card) => {
        return (
          <View style={styles.cardTypeDescription} key={card.title}>
            <CardCategory
              props={card}
              list={DISH_LIST.filter((dish) => dish.type === card.type)}
            />
          </View>
        );
      })}
      <CardMenuCategory menus={menus} />
    </ScrollView>
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
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen
          name="Ma carte"
          component={CardPage}
          options={{
            headerLeft: () => (
              <AntDesign
                style={{ paddingLeft: 20 }}
                name="arrowleft"
                size={25}
                color={"black"}
                onPress={() => alert("Todo")}
              />
            ),
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
