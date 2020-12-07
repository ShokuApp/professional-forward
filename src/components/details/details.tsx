import React, { FC, useState } from "react";
import { View } from "react-native";
import { Banner } from "./banner";
import { Restaurant } from "../../models/restaurant";
import { Input } from "./input";

type DetailsProps = {
  restaurant: Restaurant;
};
export const Details: FC<DetailsProps> = ({ restaurant }: DetailsProps) => {
  const [restaurantName, setRestaurantName] = useState(restaurant.name);
  const [address, setAddress] = useState(
    String(restaurant.address.streetNumber) + " " + restaurant.address.street
  );
  const [city, setCity] = useState(restaurant.address.city);
  const [postalCode, setPostalCode] = useState(restaurant.address.postalCode);
  const [country, setCountry] = useState(restaurant.address.country);
  const [phoneNumber, setPhoneNumber] = useState(restaurant.phone);
  return (
    <View>
      <Banner imageURL={restaurant.image} />
      <Input
        data={restaurantName}
        setData={setRestaurantName}
        label={"Nom du restaurant :"}
        isPhone={false}
      />
      <Input
        data={address}
        setData={setAddress}
        label={"Addresse :"}
        isPhone={false}
      />
      <Input
        data={postalCode}
        setData={setPostalCode}
        label={"Code postal :"}
        isPhone={false}
      />
      <Input data={city} setData={setCity} label={"Ville :"} isPhone={false} />
      <Input
        data={country}
        setData={setCountry}
        label={"Pays :"}
        isPhone={false}
      />
      <Input
        data={phoneNumber}
        setData={setPhoneNumber}
        label={"Numéro de téléphone :"}
        isPhone={true}
      />
    </View>
  );
};
