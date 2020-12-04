import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CardCategory, {
  CardCategoryProps,
} from "../components/card-page/card-category";
import CardMenuCategory from "../components/card-page/card-menu-category";
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
    paddingTop: 36,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    paddingLeft: 10,
  },
  cardTypeDescription: {
    marginBottom: 50,
  },
});

const CARD_CATEGORY: CardCategoryProps[] = [
  {
    title: "Mes entrées:",
    type: "starter",
    category: "une entrée",
  },
  {
    title: "Mes plats:",
    type: "plate",
    category: "un plat",
  },
  {
    title: "Mes desserts:",
    type: "dessert",
    category: "un dessert",
  },
];

const CardPage: FC = () => {
  const id = "a2773326-417f-4510-a390-54b875850cf9";
  const cardBloc = new CardBloc(new CardRepository());

  cardBloc.add(new CardGetEvent(id));

  return (
    <ScrollView style={styles.container}>
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
            <View>
              {CARD_CATEGORY.map((cardCategory) => {
                return (
                  <View
                    style={styles.cardTypeDescription}
                    key={cardCategory.title}
                  >
                    <CardCategory
                      cardBloc={cardBloc}
                      props={cardCategory}
                      card={(state as CardGetState).card}
                    />
                  </View>
                );
              })}
              <CardMenuCategory menus={(state as CardGetState).card.menus} />
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default CardPage;
