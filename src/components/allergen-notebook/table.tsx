import React, { FC } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import { Card } from "../../models";
import { Allergen } from "./allergen";
import { Pictogram } from "../../models";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#2196F3",
  },
  text: {
    textAlign: "center",
    fontWeight: "400",
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    minHeight: 40,
    backgroundColor: "#B8E1FF",
  },
  tableStyle: {
    borderWidth: 1,
    borderColor: "#C1C0B9",
  },
});

type TableComponentProps = {
  card: Card;
  allergens: Pictogram[];
};

export const TableComponent: FC<TableComponentProps> = ({
  card,
  allergens,
}: TableComponentProps) => {
  const tableHead = [];
  tableHead.push("Nom du plat");
  allergens = allergens.slice(0, 14);
  for (const allergen of allergens) {
    tableHead.push(<Allergen allergen={allergen} />);
  }
  const widthArr: number[] = new Array(14);
  widthArr.fill(90);
  widthArr.unshift(200);
  const tableData: string[][] = [];

  card.dishes.forEach((dish) => {
    const rowData: string[] = new Array(14);
    rowData.fill(" ");
    rowData.unshift(dish.name);
    dish.ingredients.forEach((ingredient) => {
      ingredient.allergens?.forEach((allergen) => {
        rowData[allergens.indexOf(allergen) + 1] = "X";
      });
    });
    tableData.push(rowData);
  });

  return (
    <ScrollView style={styles.container} horizontal={true}>
      <View>
        <Table borderStyle={styles.tableStyle}>
          <Row
            data={tableHead}
            widthArr={widthArr}
            style={styles.header}
            textStyle={styles.text}
          />
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={styles.tableStyle}>
            {tableData.map((rowData, index) => {
              return (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  textStyle={styles.text}
                  style={[
                    styles.row,
                    index % 2 && { backgroundColor: "#E8F5FF" },
                  ]}
                />
              );
            })}
          </Table>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
