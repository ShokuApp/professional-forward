import React, { FC } from "react";
import { View, Button, KeyboardAvoidingView, StyleSheet } from "react-native";
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
  },
});

const testIngredients: Ingredient[] = [
  {
    id: "a0148b26-9e35-449c-97ad-2acba737413d",
    name: "Ingredient 1",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
  {
    id: "15bc47b2-f22b-4feb-89e3-92fdec59e629",
    name: "Ingredient 2",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
];

const testSauces: Sauce[] = [
  {
    id: "ba82e1a5-41b8-4053-8da4-29ce90314edd",
    name: "Sauce 1",
    ingredients: [
      {
        id: "b2165eb5-9202-44b7-a70b-b910f89b69da",
        name: "Ingredient 3",
        image: "https://source.unsplash.com/random",
        allergens: [],
        diets: [],
      },
      {
        id: "e1026388-7ea4-4d0e-b3e4-cbc7a91bafd6",
        name: "Ingredient 4",
        image: "https://source.unsplash.com/random",
        allergens: [],
        diets: [],
      },
    ],
  },
  {
    id: "7021643b-2791-432c-b145-c35de0b8b151",
    name: "Sauce 2",
    ingredients: [
      {
        id: "b2165eb5-9202-44b7-a70b-b910f89b69da",
        name: "Ingredient 5",
        image: "https://source.unsplash.com/random",
        allergens: [],
        diets: [],
      },
      {
        id: "897f359d-8a5f-47de-8cb8-38770fe15715",
        name: "Ingredient 6",
        image: "https://source.unsplash.com/random",
        allergens: [],
        diets: [],
      },
    ],
  },
];

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
    const priceVal = parseFloat(priceStr.replace(",", "."));
    if (priceVal !== NaN || priceVal !== 0) {
      const newPlate: Dish = {
        id: uuidv4(),
        name: plateName,
        type: plateType,
        description: "",
        price: priceVal,
        ingredients: ingredients,
        sauces: sauces,
        isAdaptable: isAdaptable,
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
  const [plateName, setPlateName] = React.useState("");
  const [ingredients, setIngredients] = React.useState(testIngredients);
  const [sauces, setSauces] = React.useState(testSauces);
  const [price, setPrice] = React.useState("");
  const [plateType, setPlateType] = React.useState("plate");
  const [isAdaptable, setAdaptable] = React.useState(false);

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
        />
        <PlateSauces sauces={sauces} setSauces={setSauces} />

        <PlatePrice price={price} setPrice={setPrice} />

        <PlateAdaptable isAdaptable={isAdaptable} setAdaptable={setAdaptable} />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Créer"
              color="white"
              onPress={() => {
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
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
