import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Menu } from "../../models/menu";
import CategoryTitle from "../common/category-title";
import AppendCategory from "./append-category";
import CardMenu from "./card-menu";

const styles = StyleSheet.create({
  container: {
    marginBottom: 36,
  },
});

type MenusProps = {
  menus: Menu[];
};

const CardMenuCategory: FC<MenusProps> = ({ menus }: MenusProps) => {
  return (
    <View style={styles.container}>
      <CategoryTitle label="Mes menus:" />
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

export default CardMenuCategory;
