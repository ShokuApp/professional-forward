import React, { FC, SetStateAction } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Icon } from "react-native-elements";
import { Sauce } from "../../../models/sauce";
import CategoryTitle from "../../common/category-title";
import CategoryText from "../../common/category-text";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
  },
  sauceIngredients: {
    marginLeft: 45,
    marginRight: 13,
  },
  sauceItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#C6C6C8",
    minHeight: 35,
    justifyContent: "center",
  },
});

type PlateSaucesProps = {
  sauces: Sauce[];
  setSauces: React.Dispatch<SetStateAction<Sauce[]>>;
};

const PlateSauces: FC<PlateSaucesProps> = ({
  sauces,
  setSauces,
}: PlateSaucesProps) => {
  return (
    <View style={styles.container}>
      <CategoryTitle label="Sauces :" />
      {sauces.map((sauce) => {
        return (
          <View key={sauce.id}>
            <CategoryText
              label={sauce.name}
              icon={
                <Icon
                  type="simple-line-icon"
                  name="pencil"
                  size={15}
                  color="#C6C6C8"
                />
              }
            />
            <View style={styles.sauceIngredients}>
              {sauce.ingredients.map((ingredient) => {
                return (
                  <View style={styles.sauceItem} key={ingredient.id}>
                    <Text>{ingredient.name}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PlateSauces;
