import React, { FC } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Table, Row } from "react-native-table-component";
import { Icon } from "react-native-elements";
import { CardBloc, CardSetEvent } from "../../blocs";
import { Card } from "../../models";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  header: {
    height: 50,
    backgroundColor: "#537791",
  },
  text: {
    textAlign: "center",
    fontWeight: "100",
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: "#E7E6E1",
  },
});

type TableComponentProps = {
  cardBloc: CardBloc;
  card: Card;
};

export const TableComponent: FC<TableComponentProps> = ({
  cardBloc,
  card,
}: TableComponentProps) => {
  const tableHead = [
    "Nom du plat",
    "Gluten",
    "Crustacés",
    "Oeufs",
    "Poissons",
    "Arachides",
    "Soja",
    "Lait",
    "Fruits à coque",
    "Céleri",
    "Moutarde",
    "Graine de sésame",
    "Anhydride sulfureux et sulfites",
    "Lupin",
    "Mollusques",
  ];
  const widthArr = [
    200,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
  ];
  const dict = {
    Gluten: 1,
    Crustacés: 2,
    Oeufs: 3,
    Poissons: 4,
    Arachides: 5,
    Soja: 6,
    Lait: 7,
    "Fruits à coque": 8,
    Céleri: 9,
    Moutarde: 10,
    "Graine de sésame": 11,
    "Anhydride sulfureux et sulfites": 12,
    Lupin: 13,
    Mollusques: 14,
  };
  const tableData = [];
  card.dishes.map((dish) => {
    let rowData = [];
    rowData.push(dish.name);
    for (let i = 0; i < 14; i++) rowData.push("O");
    dish.ingredients.map((ingredient) => {
      ingredient.allergens?.map((allergen) => {
        rowData[dict[allergen.name]] = "X";
      });
    });
    tableData.push(rowData);
  });
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              {tableData.map((rowData, index) => {
                return (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    textStyle={styles.text}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: "#F7F6E7" },
                    ]}
                  />
                );
              })}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
