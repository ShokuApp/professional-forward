import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ingredient } from "../../models/ingredient";
import PlateName from "../../components/plates/add-plate/plate-name";
import PlateType from "../../components/plates/add-plate/plate-type";
import PlateIngredients from "../../components/plates/add-plate/plate-ingredients";
import PlatePrice from "../../components/plates/add-plate/plate-price";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});

  
  
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
  const [price, setPrice] = React.useState("");
  const [plateType, setPlateType] = React.useState("plate");

  return (
    <View>
      <PlateName name={plateName} setName={setPlateName} />
      <PlateType type={plateType} setType={setType} />
      <PlateIngredients
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <PlatePrice setPrice={setPrice} />
    </View>
  );
};

export default AddPlate;
