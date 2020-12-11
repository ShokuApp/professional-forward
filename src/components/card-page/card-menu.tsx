import React, { FC } from "react";
import { Alert, View, StyleSheet, Text } from "react-native";
import { Menu } from "../../models";
import { CategoryText } from "../common/category-text";
import { Icon } from "react-native-elements";

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
      <CategoryText
        label={menu.name}
        icon={
          <Icon
            type="simple-line-icon"
            name="pencil"
            size={15}
            color="#C6C6C8"
            onPress={() =>
              Alert.alert(
                "",
                "Cette fonctionnalité n'est pas encore disponible."
              )
            }
          />
        }
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
