import React, { FC } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import { CardBloc } from "../../blocs";
import { Card } from "../../models";
import { AllergenName } from "./allergen-name";

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
  cardBloc: CardBloc;
  card: Card;
};

type imageMapProps = {
  label: string;
  image: ImageSourcePropType;
};

export const imageMap: { [id: string]: imageMapProps[] } = {
  gluten: ["Gluten", require("../../../assets/images/allergens/gluten.png")],
  crustacés: [
    "Crustacés",
    require("../../../assets/images/allergens/crustacés.png"),
  ],
  oeufs: ["Oeufs", require("../../../assets/images/allergens/oeufs.png")],
  poissons: [
    "Poissons",
    require("../../../assets/images/allergens/poissons.png"),
  ],
  arachides: [
    "Arachides",
    require("../../../assets/images/allergens/arachides.png"),
  ],
  soja: ["Soja", require("../../../assets/images/allergens/soja.png")],
  lait: ["Lait", require("../../../assets/images/allergens/lait.png")],
  coque: [
    "Coque",
    require("../../../assets/images/allergens/fruit-à-coque.png"),
  ],
  céleri: ["Céleri", require("../../../assets/images/allergens/céleri.png")],
  moutarde: [
    "Moutarde",
    require("../../../assets/images/allergens/moutarde.png"),
  ],
  sésame: ["Sésame", require("../../../assets/images/allergens/sésame.png")],
  sulfites: [
    "Sulfites",
    require("../../../assets/images/allergens/sulfites.png"),
  ],
  lupin: ["Lupin", require("../../../assets/images/allergens/lupin.png")],
  mollusques: [
    "Mollusques",
    require("../../../assets/images/allergens/mollusques.png"),
  ],
};

export const TableComponent: FC<TableComponentProps> = ({
  cardBloc,
  card,
}: TableComponentProps) => {
  const tableHead = [];
  tableHead.push("Nom du plat");
  for (const key in imageMap) {
    const value = imageMap[key];
    tableHead.push(<AllergenName label={value[0]} path={value[1]} />);
  }
  const widthArr: number[] = new Array(14);
  widthArr.fill(90);
  widthArr.unshift(200);
  const dict: { [id: string]: number } = {
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
  const tableData: string[][] = [];

  card.dishes.forEach((dish) => {
    const rowData: string[] = new Array(14);
    rowData.fill(" ");
    rowData.unshift(dish.name);
    dish.ingredients.forEach((ingredient) => {
      ingredient.allergens?.forEach((allergen) => {
        rowData[dict[allergen.name]] = "X";
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
