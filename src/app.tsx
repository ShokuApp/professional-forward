import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { registerRootComponent } from "expo";
import CardPage from "./screens/CardPage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <CardPage />
    </SafeAreaView>
  );
};

export default registerRootComponent(App);