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

const CardPage = () => {
  return (
    <View>
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
        <Stack.Screen name="Ma carte" component={CardPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};