import React, { FC } from "react";
import { StyleSheet, View, Button } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    width: 175,
    height: 40,
    borderRadius: 20,
  },
});

const CreatePlate: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title="Créer" color="white" onPress={() => alert("Todo !")} />
      </View>
    </View>
  );
};

export default CreatePlate;
