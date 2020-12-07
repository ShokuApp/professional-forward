import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  restaurantButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: "#C6C6C8",
    marginBottom: height / 10,
  },
  restaurantButtonContext: {
    flexDirection: "row",
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
  },
});

const RestaurantButton = () => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.restaurantButton}
      onPress={() => navigate("myRestaurant")}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../../assets/images/Memphis.jpg")}
          style={styles.imageContainer}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            height: 75,
            paddingVertical: 10,
            paddingLeft: 18,
          }}
        >
          <Text style={{ fontSize: 17 }}>Mon restaurant</Text>
          <Text style={{ fontSize: 13, color: "#9A9A9A" }}>
            Nom, adresse, numéro, horaires
          </Text>
        </View>
      </View>
      <AntDesign name="right" size={15} color="#C6C6C8" />
    </TouchableOpacity>
  );
};

export default RestaurantButton;
