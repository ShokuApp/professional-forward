import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    borderTopWidth: 0.5,
    borderTopColor: "#C6C6C8",
  },
  buttonText: {
    fontSize: 17,
  },
});

export type ButtonProps = {
  id: string;
  label: string;
};

const Button: FC<ButtonProps> = ({ id, label }: ButtonProps) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.button}
      onPress={() => id === "CardPage" ? navigate(id) : alert("Todo")}
    >
      <Text style={styles.buttonText}>{label}</Text>
      <AntDesign name="right" size={15} color="#C6C6C8" />
    </TouchableOpacity>
  );
};

export default Button;
