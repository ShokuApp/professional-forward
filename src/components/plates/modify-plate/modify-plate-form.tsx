import React, { FC, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Dish } from "../../../models";
import { Ingredient } from "../../../models";
import { Sauce } from "../../../models";
import { PlateName } from "../add-plate/plate-name";
import { PlateType } from "../add-plate/plate-type";
import { PlateIngredients } from "../add-plate/plate-ingredients";
import { PlateSauces } from "../add-plate/plate-sauces";
import { PlatePrice } from "../add-plate/plate-price";
import { PlateAdaptable } from "../add-plate/plate-adaptable";
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
    marginBottom: 20,
    backgroundColor: "#2196F3",
    width: 175,
    height: 40,
    borderRadius: 20,
    alignSelf: "center",
  },
  textButton: {
    color: "white",
    fontSize: 17,
  },
});

type updatePlateParam = {
  uuid: string;
  plateName: string;
  ingredients: Ingredient[];
  sauces: Sauce[];
  price: string;
  plateType: string;
  isAdaptable: boolean;
};

const updatePlate: (param: updatePlateParam) => Dish | undefined = ({
  uuid,
  plateName,
  ingredients,
  sauces,
  price,
  plateType,
  isAdaptable,
}: updatePlateParam) => {
  if (plateName && ingredients.length !== 0 && price && plateType) {
    const priceVal = Number(price.replace(/,/g, "."));
    if (!Number.isNaN(priceVal) || priceVal !== 0) {
      const newPlate: Dish = {
        id: uuid,
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

type ModifyPlateFormProps = {
  callback: (dish: Dish) => void;
  dish: Dish;
};

export const ModifyPlateForm: FC<ModifyPlateFormProps> = ({
  callback,
  dish,
}) => {
  const [plateName, setPlateName] = useState(dish.name);
  const [ingredients, setIngredients] = useState(dish.ingredients);
  const [sauces, setSauces] = useState(dish.sauces);
  const [price, setPrice] = useState(dish.price.toString());
  const [plateType, setPlateType] = useState(dish.type);
  const [isAdaptable, setAdaptable] = useState(dish.isAdaptable);

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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            const newDish = updatePlate({
              uuid: dish.id,
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
        >
          <Text style={styles.textButton}>Créer</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
