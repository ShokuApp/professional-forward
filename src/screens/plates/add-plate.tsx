import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import PlateName from "../../components/plates/add-plate/plate-name";
import PlateType from "../../components/plates/add-plate/plate-type";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});

const AddPlate: FC = () => {
  const [plateName, setPlateName] = React.useState("");
  const [plateType, setPlateType] = React.useState("plate");
  return (
    <View style={styles.container}>
      <PlateName name={plateName} setName={setPlateName} />
      <PlateType type={plateType} setType={setPlateType} />
    </View>
  );
};

export default AddPlate;
