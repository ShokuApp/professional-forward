import React, { FC, SetStateAction } from "react";
import { View, StyleSheet } from "react-native";
import CategoryTitle from "../../common/category-title";
import DropDownPicker from "react-native-dropdown-picker";

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    zIndex: 800000,
    position: "relative",
  },
  dropDownPicker: {
    zIndex: 80000,
    position: "relative",
  },
  containerPicker: {
    height: 40,
  },
  picker: {
    marginTop: 5,
    backgroundColor: "white",
    paddingVertical: -10,
  },
  itemStyle: {
    borderBottomWidth: 0.2,
    borderColor: "rgba(8, 8, 8, 0.4)",
    elevation: 5,
  },
});

type PlateTypeProps = {
  type: string;
  setType: React.Dispatch<SetStateAction<string>>;
};

export const PlateType: FC<PlateTypeProps> = ({
  type,
  setType,
}: PlateTypeProps) => {
  return (
    <View style={styles.container}>
      <CategoryTitle label="Type du plat :" />
      <View style={styles.dropDownPicker}>
        <DropDownPicker
          items={[
            { label: "Entrée", value: "starter" },
            { label: "Plat", value: "plate" },
            { label: "Dessert", value: "dessert" },
          ]}
          defaultValue={type}
          containerStyle={styles.containerPicker}
          style={styles.picker}
          onChangeItem={(item) => setType(item.value)}
          itemStyle={styles.itemStyle}
        />
      </View>
    </View>
  );
};
