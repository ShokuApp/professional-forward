import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ingredient } from "../../models/ingredient";
import { Sauce } from "../../models/sauce";
import PlateName from "../../components/plates/add-plate/plate-name";
import PlateIngredients from "../../components/plates/add-plate/plate-ingredients";
import PlateSauces from "../../components/plates/add-plate/plate-sauces";

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

const AddPlate: FC = () => {
  const [plateName, setPlateName] = React.useState("");
  const [ingredients, setIngredients] = React.useState(testIngredients);
  const [sauces, setSauces] = React.useState(testSauces);

  return (
    <View>
      <PlateName name={plateName} setName={setPlateName} />
      <PlateIngredients
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <PlateSauces sauces={sauces} setSauces={setSauces} />
    </View>
  );
};

export default AddPlate;
