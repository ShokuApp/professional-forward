import React, { FC } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Card } from "../../models";

const styles = StyleSheet.create({
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
});

type AppendCategoryProps = {
  label: string;
  type: string;
  card: Card;
};

const AppendCategory: FC<AppendCategoryProps> = ({
  label,
  type,
  card,
}: AppendCategoryProps) => {
  const navigation = useNavigation();

  const navigateToAddCardPlates = (type: string, card: Card) => {
    navigation.navigate("AddCardPlatePage", {
      type: type,
      card: card,
    });
  };

  return (
    <TouchableOpacity
      style={styles.categoryAppend}
      onPress={() =>
        type ? navigateToAddCardPlates(type, card) : alert("Todo")
      }
    >
      <Icon type="antdesign" name="plus" size={20} color="#2196F3" />
      <Text style={styles.textAdd}>Ajouter {label}</Text>
    </TouchableOpacity>
  );
};

export default AppendCategory;
