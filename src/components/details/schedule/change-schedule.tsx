import React, { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Restaurant } from "../../../models/restaurant";
import { TimePicker } from "../../common/time-picker";
import { DayPickers } from "./day-pickers";
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

type ChangeScheduleProps = {
  restaurant: Restaurant;
  callback: (id: string, restaurant: Partial<Restaurant>) => void;
};

export const ChangeSchedule: FC<ChangeScheduleProps> = ({
  restaurant,
  callback,
}: ChangeScheduleProps) => {
  const [days, setDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const date = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  return (
    <View style={styles.container}>
      <DayPickers days={days} setDays={setDays} date={date} />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          callback(restaurant.id, {
            name: "Oui",
          });
        }}
      >
        <View style={styles.button}>
          <Text style={styles.textButton}>Appliquer</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
