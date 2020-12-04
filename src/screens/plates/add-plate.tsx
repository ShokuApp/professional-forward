import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import PlateName from "../../components/plates/add-plate/plate-name";

const AddPlate: FC = () => {
  const [plateName, setPlateName] = React.useState(" ");

  return <PlateName name={plateName} setName={setPlateName} />;
};

export default AddPlate;
