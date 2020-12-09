import React, { FC } from "react";
import { View, StyleSheet, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantButton from "../components/home/restaurant-button";
import Button, { ButtonProps } from "../components/home/button";
import PlatePage from "./plates/plates";
import CardPage from "./card-page";
import AllergenNotebookPage from "./allergen-notebook";
import { Icon } from "react-native-elements";
import RestaurantPage from "./restaurant-page";
import AddPlate from "./plates/add-plate";
import AddIngredients from "./plates/add-ingredients";
import AddSauces from "./plates/add-sauces";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  arrowLeft: {
    paddingLeft: 15,
  },
  plus: {
    paddingRight: 15,
  },
});

const BUTTONS: ButtonProps[] = [
  {
    id: "CardPage",
    label: "Ma carte du moment",
  },
  {
    id: "AllergenNotebookPage",
    label: "Mon cahier d'allergènes du moment",
  },
  {
    id: "DishesPage",
    label: "Mes plats",
  },
];

const HomePage: FC = () => {
  return (
    <View style={styles.container}>
      <RestaurantButton />
      {BUTTONS.map((button: ButtonProps, index) => {
        return (
          <View key={button.id}>
            <Button id={button.id} label={button.label} />
            {index === BUTTONS.length - 1 ? (
              <View style={{ height: 1, backgroundColor: "#C6C6C8" }} />
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

const Stack = createStackNavigator();

const AddPlateIcon: FC = () => {
  const navigation = useNavigation();

  const navigateToAddPlate = () => {
    navigation.navigate("AddPlatePage");
  };
  return (
    <Icon
      type="antdesign"
      name="plus"
      size={25}
      onPress={navigateToAddPlate}
      style={styles.plus}
    />
  );
};

const Home: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
          },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerTitle: () => (
              <Image
                source={require("../../assets/images/Shoku.png")}
                style={{ width: 135, height: 36 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="myRestaurant"
          component={RestaurantPage}
          options={{
            title: "Mon restaurant",
            headerBackImage: () => (
              <Icon
                type="antdesign"
                name="arrowleft"
                size={25}
                style={styles.arrowLeft}
              />
            ),
          }}
        />
        <Stack.Screen
          name="CardPage"
          component={CardPage}
          options={{
            title: "Ma carte",
            headerBackImage: () => (
              <Icon
                type="antdesign"
                name="arrowleft"
                size={25}
                style={styles.arrowLeft}
              />
            ),
          }}
        />
        <Stack.Screen
          name="AllergenNotebookPage"
          component={AllergenNotebookPage}
          options={{
            title: "Cahier d'allergènes",
            headerBackImage: () => (
              <Icon
                type="antdesign"
                name="arrowleft"
                size={25}
                style={styles.arrowLeft}
              />
            ),
          }}
        />
        <Stack.Screen
          name="AddPlatePage"
          component={AddPlate}
          options={{
            title: "Nouveau plat",
            headerBackImage: () => (
              <Icon
                type="antdesign"
                name="arrowleft"
                size={25}
                style={styles.arrowLeft}
              />
            ),
          }}
        />
        <Stack.Screen
          name="AddIngredientsPage"
          component={AddIngredients}
          options={{
            title: "Ajouter des ingrédients",
            headerBackImage: () => (
              <Icon
                type="antdesign"
                name="arrowleft"
                size={25}
                style={styles.arrowleft}
              />
            ),
              />
            ),
          }}
        />
        <Stack.Screen
          name="AddSaucesPage"
          component={AddSauces}
          options={{
            title: "Ajouter des sauces",
            headerBackImage: () => (
              <Icon
                type="antdesign"
                name="arrowleft"
                size={25}
                style={styles.arrowLeft}
              />
            ),
          }}
        />
        <Stack.Screen
          name="DishesPage"
          component={PlatePage}
          options={{
            title: "Mes plats",
            headerBackImage: () => (
              <Icon
                type="antdesign"
                name="arrowleft"
                size={25}
                style={styles.arrowLeft}
              />
            ),
            headerRight: () => <AddPlateIcon />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Home;
