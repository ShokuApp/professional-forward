import { PlateSauceInput } from "./plate-sauces-input";
import { PlateSaucesToAdd } from "./plate-sauces-to-add";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  LogBox,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Sauce } from "../../../models";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Button } from "../../common/button";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  button: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
  },
});

type RootStackParamList = {
  AddSaucesPage: {
    onGoBack: (sauces: Sauce[]) => void;
    saucesRecipe: Sauce[];
  };
};

type AddSauceScreenRouteProps = RouteProp<RootStackParamList, "AddSaucesPage">;

type Props = {
  availableSauces: Sauce[];
  route: AddSauceScreenRouteProps;
};

const filteredList: (
  availableList: Sauce[],
  recipeList: Sauce[],
  saucesToAdd: Sauce[]
) => Sauce[] = (availableList, recipeList, saucesToAdd) => {
  const list = availableList;

  if (recipeList) {
    for (let i = list.length - 1; i >= 0; i--) {
      for (let j = 0; j < recipeList.length; j++) {
        if (list[i] && list[i].id === recipeList[j].id) {
          list.splice(i, 1);
        }
      }
    }
  }

  return list.filter((elem) => {
    return !saucesToAdd.includes(elem);
  });
};

export const PlateSaucesForm: FC<Props> = ({ availableSauces, route }) => {
  const [saucesToAdd, setSaucesToAdd] = useState<Sauce[]>([]);
  const navigation = useNavigation();
  const addSauce = (item: Sauce) => {
    setSaucesToAdd([...saucesToAdd, item]);
  };
  const availableList = filteredList(
    availableSauces,
    route.params.saucesRecipe,
    saucesToAdd
  );

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <PlateSauceInput availableSauces={availableList} addSauce={addSauce} />
        <PlateSaucesToAdd sauces={saucesToAdd} setSauces={setSaucesToAdd} />
      </ScrollView>
      <View style={styles.button}>
        <Button
          label="Créer"
          onPress={() => {
            route.params.onGoBack(saucesToAdd);
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
};
