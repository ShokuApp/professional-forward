import React, { FC, SetStateAction } from "react";
import { View, StyleSheet, Picker, ActionSheetIOS, Button } from "react-native";
import CategoryTitle from "../../common/category-title";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  containerPicker: {
    height: 40,
  },
  picker: {
    marginTop: 5,
    backgroundColor: "white",
  },
});

type PlateTypeProps = {
  type: string;
  setType: React.Dispatch<SetStateAction<string>>;
};

const PlateType: FC<PlateTypeProps> = ({ type, setType }: PlateTypeProps) => {
  return (
    <View style={styles.container}>
      <CategoryTitle label="Type du plat :" />
      <DropDownPicker
        items={[
          { label: "Entrée", value: "starter" },
          { label: "Plat", value: "plate" },
          { label: "Dessert", value: "dessert" },
        ]}
        defaultValue={type}
        containerStyle={styles.containerPicker}
        style={styles.picker}
        dropDownStyle={styles.picker}
        onChangeItem={(item) => setType(item.value)}
      />
    </View>
  );
};

export default PlateType;
