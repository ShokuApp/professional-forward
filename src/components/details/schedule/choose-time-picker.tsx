import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TimePicker } from "../../common/time-picker";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  picker: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 70,
  },
  timeSelector: {
    marginHorizontal: 10,
  },
});

type ChooseTimePickerProps = {
  setMinStart: (min: string) => void;
  setMinEnd: (min: string) => void;
  setHourStart: (min: string) => void;
  setHourEnd: (min: string) => void;
  closed: boolean;
  label: string;
  fullTime: boolean;
};

export const ChooseTimePicker: FC<ChooseTimePickerProps> = ({
  setMinStart,
  setMinEnd,
  setHourStart,
  setHourEnd,
  label,
  closed,
  fullTime,
}: ChooseTimePickerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.picker, fullTime ? { marginLeft: 60 } : null]}>
        <Text style={styles.timeSelector}>de</Text>
        <TimePicker
          onMinutesChange={setMinStart}
          onHoursChange={setHourStart}
          closed={closed}
        />
        <Text style={styles.timeSelector}>à</Text>
        <TimePicker onMinutesChange={setMinEnd} onHoursChange={setHourEnd} closed={closed} />
      </View>
    </View>
  );
};
