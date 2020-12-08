import React, { FC } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  searchButton: {
    alignItems: "center",
    backgroundColor: "#2196F3",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 1,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  searchText: {
    fontWeight: "bold",
    color: "white",
  },
});

type Props = {
  label: string;
  onPress: () => void;
};

export const Button: FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.searchButton}>
        <Text style={styles.searchText}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};