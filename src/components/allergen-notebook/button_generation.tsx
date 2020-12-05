import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 25
  },
  text: {
    color: "white",
    fontSize: 17
  }
})

const ButtonGeneration: FC = () => {
  return (
    <TouchableOpacity onPress={() => alert("TODO")}>
      <View style={styles.button}>
        <Text style={styles.text}>Générer mon cahier d'allergènes</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonGeneration;