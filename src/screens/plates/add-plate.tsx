import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ingredient } from "../../models/ingredient";
import PlateName from "../../components/plates/add-plate/plate-name";
import PlateType from "../../components/plates/add-plate/plate-type";
import PlateIngredients from "../../components/plates/add-plate/plate-ingredients";
import PlatePrice from "../../components/plates/add-plate/plate-price";
import PlateCreate from "../../components/plates/add-plate/plate-create";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
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
    <View style={styles.container}>
      <PlateName name={plateName} setName={setPlateName} />
      <PlateType type={plateType} setType={setPlateType} />
      <PlateIngredients
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <PlatePrice setPrice={setPrice} />
      <PlateCreate />
    </View>
  );
};

export default AddPlate;
