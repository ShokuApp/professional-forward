import React, { FC} from 'react'
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PlateDescription from "../components/plates/plates-description"

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  }
})

const PlatesPage = () => {
  return (
    <View style={styles.page}>
      <PlateDescription key="1"/>
      <PlateDescription key="2"/>
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
        <Stack.Screen name="Mes plats" component={PlatesPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
