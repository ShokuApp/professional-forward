import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MyCheckBox } from "../checkbox";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
  },
});

type DayPickerItemProps = {
  day: string;
  days: boolean[];
  id: number;
  setDays: (days: boolean[]) => void;
};
export const DayPickerItem: FC<DayPickerItemProps> = ({
  day,
  days,
  id,
  setDays,
}: DayPickerItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{day}</Text>
      <MyCheckBox
        label=""
        check={days[id]}
        onPress={() => {
          const copy = [...days];
          copy[id] = !copy[id];
          setDays(copy);
        }}
      />
    </View>
  );
};
