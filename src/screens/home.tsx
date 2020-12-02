import React, { FC } from "react";
import { View, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantButton from "../components/home/restaurant-button";
import Button, { ButtonProps } from "../components/home/button";
import PlatePage from "../screens/plates";
import CardPage from "./card-page";
import { AntDesign } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
        name="CardPage"
        component={CardPage}
        options={{
          title: "Ma carte",
          headerBackImage: () => (
            <AntDesign
              name="arrowleft"
              size={25}
              style={{ paddingLeft: 15 }}
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
              <AntDesign
                name="arrowleft"
                size={25}
                style={{ paddingLeft: 15 }}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Home;
