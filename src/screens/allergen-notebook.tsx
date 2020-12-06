import React, { FC, useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TableComponent } from "../components/allergen-notebook/table";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  CardBloc,
  CardGetEvent,
  CardGetState,
  CardState,
  CardErrorState,
  CardLoadingState,
  CardInitialState,
} from "../blocs";
import { CardRepository } from "../repositories";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "white",
  },
  text: {
    fontSize: 17,
    color: "#C4C4C4",
    maxWidth: 210,
    flexWrap: "wrap",
    textAlign: "center",
    marginBottom: 20,
  },
  vertical: {
    width: 1000,
    height: 2000,
    paddingHorizontal: 20,
    backgroundColor: "red",
    marginBottom: 50,
  },
  horizontal: {
    width: 800,
    height: 1800,
    backgroundColor: "yellow",
  },
  button: {
    borderRadius: 25,
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  textButton: {
    color: "white",
    fontSize: 17,
  },
});

const AllergenNotebookPage: FC = () => {
  const [generation, setGeneration] = useState(false);
  const id = "88744501-fb78-41b0-a1e6-bc6a5da00528";
  const cardBloc = new CardBloc(new CardRepository());

  cardBloc.add(new CardGetEvent(id));
  return (
    <View style={styles.container}>
      {!generation ? (
        <Text style={styles.text}>Vous n'avez pas de cahier d'allergènes</Text>
      ) : (
        <BlocBuilder
          bloc={cardBloc}
          builder={(state: CardState) => {
            if (state instanceof CardErrorState) {
              return <Text>Error</Text>;
            }
            if (state instanceof CardInitialState) {
              return <Text>Loading</Text>;
            }
            if (state instanceof CardLoadingState) {
              return <Text>Loading</Text>;
            }
            return (
              <TableComponent
                cardBloc={cardBloc}
                card={(state as CardGetState).card}
              />
            );
          }}
        />
      )}
      <TouchableOpacity onPress={() => setGeneration(true)}>
        <View style={styles.button}>
          <Text style={styles.textButton}>Générer mon cahier d'allergènes</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AllergenNotebookPage;
