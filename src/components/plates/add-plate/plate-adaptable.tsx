import React, { FC, SetStateAction } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import CategoryTitle from "../../common/category-title";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 42,
  },
  checkboxLabel: {
    justifyContent: "center",
  },
  checkbox: {
    paddingBottom: 10,
  }
});

type PlateAdaptableProps = {
  isAdaptable: boolean;
  setAdaptable: React.Dispatch<SetStateAction<boolean>>;
};

const PlateAdaptable: FC<PlateAdaptableProps> = ({
  isAdaptable,
  setAdaptable,
}: PlateAdaptableProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.checkboxLabel}>
        <CategoryTitle label="Ce plat est adaptable :" />
      </View>
      <View style={styles.checkbox}>
        <Checkbox
          status={isAdaptable ? "checked" : "unchecked"}
          onPress={() => {
            setAdaptable(!isAdaptable);
          }}
          color="#2196F3"
        />
      </View>
    </View>
  );
};

export default PlateAdaptable;
