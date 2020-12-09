import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TimeRange } from "../../../models";
import { DayPickerItem } from "./day-picker-item";

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  text: {
    color: "#9A9A9A",
    fontSize: 18,
    marginBottom: 10,
  },
});

type DayPickersProps = {
  days: boolean[];
  setDays: (days: boolean[]) => void;
  date: string[];
};

export const DayPickers: FC<DayPickersProps> = ({
  days,
  setDays,
  date,
}: DayPickersProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Jours concernés :</Text>
      <View>
        {date.map((day, id) => {
          return (
            <DayPickerItem
              day={day}
              days={days}
              key={id}
              id={id}
              setDays={setDays}
            />
          );
        })}
      </View>
    </View>
  );
};
