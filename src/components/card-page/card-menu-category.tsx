import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Menu } from "../../models";
import { CategoryTitle } from "../common/category-title";
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
      <CategoryTitle label="Mes menus :" />
      {menus.map((menu) => {
        return <CardMenu key={menu.id} menu={menu} />;
      })}
      <AppendCategory label={"un menu"} />
    </View>
  );
};

export default CardMenuCategory;
