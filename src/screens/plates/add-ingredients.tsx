import React, { FC } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Ingredient } from "../../models/ingredient";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { PlateIngredientInput } from "../../components/plates/add-ingredients/plate-ingredients-input";
import { PlateIngredientsToAdd } from "../../components/plates/add-ingredients/plate-ingredients-to-add";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    width: 175,
    height: 40,
    borderRadius: 20,
  },
});

const availableIngredients: Ingredient[] = [
  {
    id: "9eac69a2-21e9-4d16-968a-db5d40513baa",
    name: "Pates",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
  {
    id: "c1f92648-3b47-4db5-baa9-0f0533a97d7f",
    name: "Carottes",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
  {
    id: "c1f92648-3b47-4db5-baa9-tomate",
    name: "Tomates",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
  {
    id: "c1f92648-3b47-4db5-baa9-Riz",
    name: "Riz",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
  {
    id: "c1f92648-3b47-4db5-baa9-Lentilles",
    name: "Lentilles",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
  {
    id: "c1f92648-3b47-4db5-baa9-Haricots",
    name: "Harricots verts",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
  {
    id: "c1f92648-3b47-4db5-baa9-Thon",
    name: "Thon",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
  {
    id: "c1f92648-3b47-4db5-baa9-Truite",
    name: "Truite",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
  {
    id: "c1f92648-3b47-4db5-baa9-Oeuf",
    name: "Oeuf",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
  {
    id: "c1f92648-3b47-4db5-baa9-salade",
    name: "Salade",
    image: "https://source.unsplash.com/random",
    allergens: [],
    diets: [],
  },
];

type RootStackParamList = {
  AddIngredientsPage: { onGoBack: (ingredients: Ingredient[]) => void };
};

type AddIngredientScreenRouteProps = RouteProp<
  RootStackParamList,
  "AddIngredientsPage"
>;

type Props = {
  route: AddIngredientScreenRouteProps;
};

const AddIngredients: FC<Props> = ({ route }) => {
  const [ingredientsToAdd, setIngredientsToAdd] = React.useState<Ingredient[]>(
    []
  );
  const navigation = useNavigation();

  const addIngredient = (item: Ingredient) => {
    setIngredientsToAdd([...ingredientsToAdd, item]);
  };

  return (
    <View style={styles.container}>
      <PlateIngredientInput
        availableIngredients={availableIngredients}
        addIngredient={addIngredient}
      />
      <PlateIngredientsToAdd
        ingredients={ingredientsToAdd}
        setIngredients={setIngredientsToAdd}
      />
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            title="Créer"
            color="white"
            onPress={() => {
              route.params.onGoBack(ingredientsToAdd);
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default AddIngredients;
