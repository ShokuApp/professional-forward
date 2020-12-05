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
    id: "9eac69a2-21e9-4d16-968a-db5d40513baa",
    name: "Ingredient 1",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
  {
    id: "c1f92648-3b47-4db5-baa9-0f0533a97d7f",
    name: "Ingredient 2",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
];

const testSauces: Sauce[] = [
  {
    id: "6f30b628-852c-407b-ba4a-ba9d0a0cb892",
    name: "Sauce 1",
    ingredients: [
      {
        id: "01d98550-82fa-4173-950f-9e7da68a4fee",
        name: "Ingredient 3",
        image: "https://source.unsplash.com/random",
        allergens: [],
        diets: [],
      },
      {
        id: "c1f92648-3b47-4db5-baa9-0f0533a97d7f",
        name: "Ingredient 4",
        image: "https://source.unsplash.com/random",
        allergens: [],
        diets: [],
      },
    ],
  },
  {
    id: "9113afcd-de27-4300-bfaa-1439e73a8801",
    name: "Sauce 2",
    ingredients: [
      {
        id: "ae2d44c1-1ae0-4a08-b03a-73c6c7a76993",
        name: "Ingredient 5",
        image: "https://source.unsplash.com/random",
        allergens: [],
        diets: [],
      },
      {
        id: "7e9d3bad-c255-4830-a0f5-37111518a242",
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
