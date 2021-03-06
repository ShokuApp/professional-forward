import React, { FC, SetStateAction, Dispatch } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { CategoryTitle } from "../../common/category-title";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
  },
  input: {
    width: "95%",
    marginBottom: 10,
  },
  textInput: {
    marginTop: 5,
    fontSize: 19,
  },
  border: {
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#C6C6C8",
  },
  cross: {
    position: "relative",
    top: 10,
  },
});

type PlateNameProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};

export const PlateName: FC<PlateNameProps> = ({
  name,
  setName,
}: PlateNameProps) => {
  return (
    <View style={styles.container}>
      <CategoryTitle label="Nom du plat :" />
      <View style={styles.border}>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setName(text)}
            value={name}
            clearButtonMode="always"
            placeholder="Entrez le nom du plat"
            placeholderTextColor="#C6C6C8"
          />
        </View>
      </View>
    </View>
  );
};
