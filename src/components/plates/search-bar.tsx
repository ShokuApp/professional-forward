import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

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
  searchText: {
    marginLeft: 5,
    color: "#767680",
    fontSize: 17,
  },
});

const SearchBar: FC = () => {
  return (
    <View style={styles.container}>
      <Icon type="evil-icon" name="search" size={24} color="#767680" />
      <Text style={styles.searchText}>Rechercher</Text>
    </View>
  );
};

export default SearchBar;
