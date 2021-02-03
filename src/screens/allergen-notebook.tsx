import React, { FC, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TableComponent } from "../components/allergen-notebook/table";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  CardBloc,
  CardErrorState,
  CardGetEvent,
  CardGetState,
  CardState,
  PictogramBloc,
  PictogramErrorState,
  PictogramListEvent,
  PictogramListState,
  PictogramState,
} from "../blocs";
import { CardRepository, PictogramRepository } from "../repositories";
import { Card } from "../models";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  generation: {
    marginTop: 42,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});

type NoAllergenNotebookProps = {
  setGeneration: (generation: boolean) => void;
};

const GenerateAllergenNotebook: FC<NoAllergenNotebookProps> = ({
  setGeneration,
}: NoAllergenNotebookProps) => {
  return (
    <View style={styles.generation}>
      <Text style={styles.text}>
        {"Vous n'avez pas de cahier d'allergènes"}
      </Text>
      <TouchableOpacity onPress={() => setGeneration(true)}>
        <View style={styles.button}>
          <Text style={styles.textButton}>
            {"Générer mon cahier d'allergènes"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

type AllergenFetcherProps = {
  card: Card;
};

const AllergenFetcher: FC<AllergenFetcherProps> = ({
  card,
}: AllergenFetcherProps) => {
  const allergenBloc = new PictogramBloc(new PictogramRepository());

  allergenBloc.add(new PictogramListEvent());
  return (
    <BlocBuilder
      bloc={allergenBloc}
      builder={(state: PictogramState) => {
        if (state instanceof PictogramErrorState) {
          return <Text>Error</Text>;
        }
        if (state instanceof PictogramListState) {
          return <TableComponent card={card} allergens={state.pictograms} />;
        }
        return <Text>Loading</Text>;
      }}
    />
  );
};

const DisplayAllergenNotebook: FC = () => {
  const id = "6cffd2e5-e2f3-4690-9e5b-ca6b6e3ec9a5";
  const cardBloc = new CardBloc(new CardRepository());

  cardBloc.add(new CardGetEvent(id));
  return (
    <BlocBuilder
      bloc={cardBloc}
      builder={(state: CardState) => {
        if (state instanceof CardErrorState) {
          return <Text>Error</Text>;
        }
        if (state instanceof CardGetState) {
          return <AllergenFetcher card={state.card} />;
        }
        return <Text>Loading</Text>;
      }}
    />
  );
};

const AllergenNotebookPage: FC = () => {
  const [generation, setGeneration] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {!generation ? (
        <GenerateAllergenNotebook setGeneration={setGeneration} />
      ) : (
        <DisplayAllergenNotebook />
      )}
    </SafeAreaView>
  );
};

export default AllergenNotebookPage;
