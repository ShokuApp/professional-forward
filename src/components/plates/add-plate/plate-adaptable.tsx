import React, { FC, SetStateAction } from "react";
import { View, StyleSheet, Text } from "react-native";
import { CheckBox } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
  },
  checkboxTitle: {
    color: "#2196F3",
    fontSize: 16,
  },
  checkboxContainer: {
    backgroundColor: "white",
    borderColor: "white",
    marginLeft: 0,
    paddingLeft: 0,
  },
});

type PlateAdaptableProps = {
  isAdaptable: boolean;
  setAdaptable: React.Dispatch<SetStateAction<boolean>>;
};

export const PlateAdaptable: FC<PlateAdaptableProps> = ({
  isAdaptable,
  setAdaptable,
}: PlateAdaptableProps) => {
  return (
    <View style={styles.container}>
      <CheckBox
        title={
          <Text style={styles.checkboxTitle}>Ce plat est adaptable : </Text>
        }
        checked={isAdaptable}
        onPress={() => setAdaptable(!isAdaptable)}
        iconRight
        checkedColor="#2196F3"
        containerStyle={styles.checkboxContainer}
      />
    </View>
  );
};