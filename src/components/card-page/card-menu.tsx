import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Menu } from "../../models/menu";
import CardText from "./card-text";

const styles = StyleSheet.create({
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

export default CardMenu;