import React, { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import CategoryTitle from "../../common/category-title";
import DropDownPicker from "react-native-dropdown-picker";

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  pickerContainer: {
    marginTop: 5,
  },
  picker: {
    height: 40,
    backgroundColor: "white",
  },
  itemPicker: {
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    borderColor: "rgba(8, 8, 8, 0.4)",
  },
});

type PlateTypeProps = {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
};

export const PlateType: FC<PlateTypeProps> = ({
  type,
  setType,
}: PlateTypeProps) => {
  return (
    <View style={styles.container}>
      <CategoryTitle label="Type du plat :" />
      <View style={styles.pickerContainer}>
        <DropDownPicker
          items={[
            { label: "Entrée", value: "starter" },
            { label: "Plat", value: "plate" },
            { label: "Dessert", value: "dessert" },
          ]}
          defaultValue={type}
          style={styles.picker}
          itemStyle={styles.itemPicker}
          onChangeItem={(item) => setType(item.value)}
        />
      </View>
    </View>
  );
};
