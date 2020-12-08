import React, { FC, useState } from "react";
import { View, Button, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Dish } from "../../../models";
import { Ingredient } from "../../../models/ingredient";
import { Sauce } from "../../../models/sauce";
import { PlateName } from "./plate-name";
import { PlateType } from "./plate-type";
import { PlateIngredients } from "./plate-ingredients";
import { PlateSauces } from "./plate-sauces";
import { PlatePrice } from "./plate-price";
import { PlateAdaptable } from "./plate-adaptable";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    width: 175,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  textButton: {
    color: "white",
    fontSize: 17
  }
});

type newPlateParam = {
  plateName: string;
  ingredients: Ingredient[];
  sauces: Sauce[];
  price: string;
  plateType: string;
  isAdaptable: boolean;
};

const addNewPlate: (param: newPlateParam) => Dish | undefined = ({
  plateName,
  ingredients,
  sauces,
  price,
  plateType,
  isAdaptable,
}: newPlateParam) => {
  if (plateName && ingredients.length !== 0 && price && plateType) {
    const priceStr = price;
    const priceVal = Number(priceStr.replace(/\,/g, "."));
    if (!Number.isNaN(priceVal) || priceVal !== 0) {
      const newPlate: Dish = {
        id: uuidv4(),
        name: plateName,
        type: plateType,
        description: "",
        price: priceVal,
        ingredients,
        sauces,
        isAdaptable,
      };
      return newPlate;
    }
  }
  return undefined;
};

type PlateFormProps = {
  callback: (dish: Dish) => void;
};

export const PlateForm: FC<PlateFormProps> = ({ callback }: PlateFormProps) => {
  const [plateName, setPlateName] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [sauces, setSauces] = useState<Sauce[]>([]);
  const [price, setPrice] = useState("");
  const [plateType, setPlateType] = useState("plate");
  const [isAdaptable, setAdaptable] = useState(false);

  const refreshIngredients: (newIngredientsTab: Ingredient[]) => void = (
    newIngredientsTab
  ) => {
    setIngredients(ingredients.concat(newIngredientsTab));
  };

  const refreshSauces: (newSaucesTab: Sauce[]) => void = (newSaucesTab) => {
    setSauces(sauces.concat(newSaucesTab));
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={120}
      style={styles.container}
    >
      <ScrollView>
        <PlateName name={plateName} setName={setPlateName} />

        <PlateType type={plateType} setType={setPlateType} />
        <PlateIngredients
          ingredients={ingredients}
          setIngredients={setIngredients}
          callback={refreshIngredients}
        />
        <PlateSauces
          sauces={sauces}
          setSauces={setSauces}
          callback={refreshSauces}
        />

        <PlatePrice price={price} setPrice={setPrice} />

        <PlateAdaptable isAdaptable={isAdaptable} setAdaptable={setAdaptable} />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                const newDish = addNewPlate({
                  plateName,
                  ingredients,
                  sauces,
                  price,
                  plateType,
                  isAdaptable,
                });
                if (newDish) {
                  callback(newDish);
                }
              }}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Créer</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
