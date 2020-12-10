import React, { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { CategoryTitle } from "../../common/category-title";
import { AddSauceButton } from "./add-sauce-button";
import { Sauce } from "../../../models";
import { SauceItem } from "./sauce-item";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
  },
});

type PlateSaucesProps = {
  sauces: Sauce[];
  setSauces: Dispatch<SetStateAction<Sauce[]>>;
  callback: (newSaucesTab: Sauce[]) => void;
};

export const PlateSauces: FC<PlateSaucesProps> = ({
  sauces,
  setSauces,
  callback,
}: PlateSaucesProps) => {
  return (
    <View style={styles.container}>
      <CategoryTitle label="Sauces :" />
      {sauces.map((sauce) => {
        return (
          <SauceItem
            key={sauce.id}
            sauce={sauce}
            sauces={sauces}
            setSauces={setSauces}
          />
        );
      })}
      <AddSauceButton sauces={sauces} callback={callback} />
    </View>
  );
};
