import React, { FC, SetStateAction } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import CategoryTitle from "../../common/category-title";

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
  },
  price: {
    flexDirection: "row",
  },
  inputBox: {
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: "#2196F3",
    borderWidth: 1,
    minWidth: 60,
    height: 46.5,
    justifyContent: "center",
  },
  input: {
    textAlign: "center",
  },
  eurosContainer: {
    justifyContent: "center",
  },
  euros: {
    fontSize: 17,
    marginLeft: 5,
  },
});

type PlatePriceProps = {
  price: string;
  setPrice: React.Dispatch<SetStateAction<string>>;
};

export const PlatePrice: FC<PlatePriceProps> = ({
  price,
  setPrice,
}: PlatePriceProps) => {
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={Keyboard.dismiss}
    >
      <CategoryTitle label="Prix :" />
      <View style={styles.price}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={price.toString()}
            keyboardType="decimal-pad"
            onChangeText={(newPrice) => setPrice(newPrice)}
          />
        </View>
        <View style={styles.eurosContainer}>
          <Text style={styles.euros}>€</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
