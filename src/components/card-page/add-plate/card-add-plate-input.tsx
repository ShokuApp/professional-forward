import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Dish } from "../../../models";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
    zIndex: 1000,
    flex: 1,
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
});

type CardAddPlateInputProps = {
  availablePlates: Dish[];
  addPlates: (item: Dish) => void;
};

export const CardAddPlateInput: FC<CardAddPlateInputProps> = ({
  availablePlates,
  addPlates,
}: CardAddPlateInputProps) => {
  const [listPlates, setListPlates] = useState<Dish[]>([]);
  const [text, setText] = useState("");

  const findPlate = (query: string) => {
    setText(query);
    if (query) {
      const regex = new RegExp(`${query.trim()}`, "i");
      setListPlates(
        availablePlates.filter(
          (listPlates) => listPlates.name.search(regex) >= 0
        )
      );
    } else {
      setListPlates([]);
    }
  };

  return (
    <View style={styles.container}>
      <Autocomplete
        data={listPlates}
        value={text}
        placeholder={"Entrez votre plat"}
        placeholderTextColor="#C6C6C8"
        onChangeText={(text: string) => findPlate(text)}
        listStyle={{ maxHeight: 350 }}
        flatListProps={{ nestedScrollEnabled: true }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                addPlates(item);
                setListPlates([]);
                setText("");
              }}
              delayPressIn={0}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
