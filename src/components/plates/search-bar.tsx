import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
    marginBottom: 10,
    width: "88%",
    height: 36,
    backgroundColor: "#E6E3E3",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  containerLeft: {
    display: "flex",
    flexDirection: "row",
  },
  searchText: {
    marginLeft: 5,
    color: "#767680",
    fontSize: 17,
  },
});

const SearchBar: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <EvilIcons name="search" size={24} color="#767680" />
        <Text style={styles.searchText}>Rechercher</Text>
      </View>
      <FontAwesome name="microphone" size={19} color="#767680" />
    </View>
  );
};

export default SearchBar;
