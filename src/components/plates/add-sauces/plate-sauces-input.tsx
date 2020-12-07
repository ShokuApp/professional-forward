import React, { FC, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Sauce } from "../../../models";

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
  autocompleteContainer: {
    position: "relative",
    zIndex: 80,
  },
});

type PlateSaucesInputProps = {
  availableSauces: Sauce[];
  addSauce: (item: Sauce) => void;
};

export const PlateSauceInput: FC<PlateSaucesInputProps> = ({
  availableSauces,
  addSauce,
}: PlateSaucesInputProps) => {
  const [listSauces, setListSauces] = useState<Sauce[]>([]);
  const [selectedValue, setSelectedValue] = useState({});
  const [text, setText] = useState("");

  const findSauce = (query: string) => {
    setText(query);
    if (query) {
      const regex = new RegExp(`${query.trim()}`, "i");
      setListSauces(
        availableSauces.filter(
          (listSauces) => listSauces.name.search(regex) >= 0
        )
      );
    } else {
      setListSauces([]);
    }
  };

  return (
    <View style={styles.container}>
      <Autocomplete
        data={listSauces}
        defaultValue={
          JSON.stringify(selectedValue) === "{}" ? "" : selectedValue
        }
        value={text}
        placeholder={"Entrez votre ingrédient"}
        onChangeText={(text: string) => findSauce(text)}
        listStyle={{ maxHeight: 350 }}
        renderItem={({ item }: Sauce) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedValue(item.name);
                addSauce(item);
                setListSauces([]);
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
