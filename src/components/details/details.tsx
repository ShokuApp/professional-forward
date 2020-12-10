import React, { FC, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Banner } from "./banner";
import { Restaurant } from "../../models";
import { Input } from "./input";
import { ScheduleButton } from "./schedule/schedule-button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  buttonContainer: {
    marginTop: 42,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    width: 175,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontSize: 17,
  },
});

type DetailsProps = {
  restaurant: Restaurant;
  callback: (id: string, restaurant: Partial<Restaurant>) => void;
};

export const Details: FC<DetailsProps> = ({
  restaurant,
  callback,
}: DetailsProps) => {
  const [restaurantName, setRestaurantName] = useState(restaurant.name);
  const [address, setAddress] = useState(
    String(restaurant.address.streetNumber) + " " + restaurant.address.street
  );
  const [city, setCity] = useState(restaurant.address.city);
  const [postalCode, setPostalCode] = useState(restaurant.address.postalCode);
  const [country, setCountry] = useState(restaurant.address.country);
  const [phoneNumber, setPhoneNumber] = useState(restaurant.phone);
  const [website, setWebsite] = useState(restaurant.url);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={120}
      style={styles.container}
    >
      <ScrollView>
        <Banner imageURL={restaurant.image} />
        <Input
          data={restaurantName}
          setData={setRestaurantName}
          label={"Nom du restaurant :"}
          keyboardCategory={"default"}
        />
        <Input
          data={address}
          setData={setAddress}
          label={"Addresse :"}
          keyboardCategory={"default"}
        />
        <Input
          data={postalCode}
          setData={setPostalCode}
          label={"Code postal :"}
          keyboardCategory={"number-pad"}
        />
        <Input
          data={city}
          setData={setCity}
          label={"Ville :"}
          keyboardCategory={"default"}
        />
        <Input
          data={country}
          setData={setCountry}
          label={"Pays :"}
          keyboardCategory={"default"}
        />
        <Input
          data={phoneNumber}
          setData={setPhoneNumber}
          label={"Numéro de téléphone :"}
          keyboardCategory={"phone-pad"}
        />
        <Input
          data={website}
          setData={setWebsite}
          label={"Site web (facultatif) :"}
          keyboardCategory={"default"}
        />
        <ScheduleButton />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            callback(restaurant.id, {
              name: restaurantName,
              phone: phoneNumber,
              url: website,
              address: {
                streetNumber: parseInt(
                  address.substr(0, address.indexOf(" ")),
                  10
                ),
                street: address.substr(address.indexOf(" ") + 1),
                postalCode,
                city,
                country,
              },
            });
          }}
        >
          <View style={styles.button}>
            <Text style={styles.textButton}>Sauvegarder</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
