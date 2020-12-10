import React, { FC, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MyCheckBox } from "../checkbox";
import { TimePickers } from "./time-pickers";

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    display: "flex",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  opening: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#9A9A9A",
    fontSize: 18,
    marginBottom: 10,
  },
});

type ScheduleTimePickerProps = {
  setMinStartMidDay: (min: string) => void;
  setMinEndMidDay: (min: string) => void;
  setMinStartEvening: (min: string) => void;
  setMinEndEvening: (min: string) => void;
  setHourStartMidDay: (hour: string) => void;
  setHourEndMidDay: (hour: string) => void;
  setHourStartEvening: (hour: string) => void;
  setHourEndEvening: (hour: string) => void;
  closed: boolean;
  setClosed: (closed: boolean) => void;
  fullTime: boolean;
  setFullTime: (fullTime: boolean) => void;
};

export const ScheduleTimePicker: FC<ScheduleTimePickerProps> = ({
  setMinStartMidDay,
  setMinEndMidDay,
  setMinStartEvening,
  setMinEndEvening,
  setHourStartMidDay,
  setHourEndMidDay,
  setHourStartEvening,
  setHourEndEvening,
  closed,
  setClosed,
  fullTime,
  setFullTime,
}: ScheduleTimePickerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.opening}>
        <Text style={styles.text}>Ouverture :</Text>
        <MyCheckBox
          label={"Service continu"}
          check={fullTime}
          onPress={() => {
            setFullTime(!fullTime);
          }}
        />
      </View>
      <TimePickers
        setMinStartMidDay={setMinStartMidDay}
        setMinEndMidDay={setMinEndMidDay}
        setMinStartEvening={setMinStartEvening}
        setMinEndEvening={setMinEndEvening}
        setHourStartMidDay={setHourStartMidDay}
        setHourEndMidDay={setHourEndMidDay}
        setHourStartEvening={setHourStartEvening}
        setHourEndEvening={setHourEndEvening}
        closed={closed}
        fullService={fullTime}
      />
      <MyCheckBox
        label={"Restaurant fermé"}
        check={closed}
        onPress={() => setClosed(!closed)}
      />
    </View>
  );
};
