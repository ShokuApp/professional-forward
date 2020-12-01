import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  restaurantButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: "#C6C6C8",
    marginBottom: height / 10,
  },
  restaurantButtonContext: {
    flexDirection: "row",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    borderTopWidth: 0.5,
    borderTopColor: "#C6C6C8",
  },
  buttonText: {
    fontSize: 17,
  },
});

type ButtonProps = {
  id: string;
  label: string;
};

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

const Button = ({ id, label }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.button}
      onPress={() => alert("Todo!")}
    >
      <Text style={styles.buttonText}>{label}</Text>
      <AntDesign name="right" size={15} color="#C6C6C8" />
    </TouchableOpacity>
  );
};

const RestaurantButton = () => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.restaurantButton}
      onPress={() => alert("Todo!")}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Image</Text>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            height: 75,
            paddingVertical: 10,
            paddingLeft: 18,
          }}
        >
          <Text style={{ fontSize: 17 }}>Mon restaurant</Text>
          <Text style={{ fontSize: 13, color: "#9A9A9A" }}>
            Nom, adresse, numéro, horaires
          </Text>
        </View>
      </View>
      <AntDesign name="right" size={15} color="#C6C6C8" />
    </TouchableOpacity>
  );
};

const HomePage = () => {
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

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
