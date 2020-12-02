import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Menu } from "../../models/menu";
import AppendCategory from "./append-category";
import CardMenu from "./card-menu";

const styles = StyleSheet.create({
  cardCategoryType: {
    marginBottom: 7,
    color: "#2196F3",
    fontSize: 16,
  },
});

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

export default CardMenuCategory;