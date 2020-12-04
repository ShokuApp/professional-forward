import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ingredient } from "../../models/ingredient";
import PlateName from "../../components/plates/add-plate/plate-name";
import PlateIngredients from "../../components/plates/add-plate/plate-ingredients";

const testTab: Ingredient[] = [
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

const AddPlate: FC = () => {
  const [plateName, setPlateName] = React.useState("");
  const [ingredients, setIngredients] = React.useState(testTab);

  return (
    <View>
      <PlateName name={plateName} setName={setPlateName} />
      <PlateIngredients
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
    </View>
  );
};

export default AddPlate;
