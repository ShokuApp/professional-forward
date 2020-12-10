import React, { FC, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TimeRange, Restaurant } from "../../../models";
import { ScheduleTimePicker } from "./schedule-time-picker";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  text: {
    marginTop: 20,
    fontSize: 40,
    color: "#2196F3",
    alignSelf: "center",
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

type ChangeScheduleDayProps = {
  day: number;
  id: string;
  oldOpeningTime: TimeRange[][];
  callback: (id: string, restaurant: Partial<Restaurant>) => void;
};

type newOpeningTime = {
  minStartMidDay: string;
  minEndMidDay: string;
  hourStartMidDay: string;
  hourEndMidDay: string;
  minStartEvening: string;
  minEndEvening: string;
  hourStartEvening: string;
  hourEndEvening: string;
  closed: boolean;
  fullTime: boolean;
  oldOpeningTime: TimeRange[][];
  id: number;
};

const changeOpeningTime: (newOpeningTime: newOpeningTime) => TimeRange[][] = ({
  minStartMidDay,
  minEndMidDay,
  hourStartMidDay,
  hourEndMidDay,
  minStartEvening,
  minEndEvening,
  hourStartEvening,
  hourEndEvening,
  closed,
  fullTime,
  oldOpeningTime,
  id,
}: newOpeningTime) => {
  const openingTime: TimeRange[][] = [];
  for (let idx = 0; idx < 7; idx++) {
    if (idx !== id) {
      openingTime.push(oldOpeningTime[idx]);
    } else {
      const tmp: TimeRange[] = [];
      if (closed) {
        openingTime.push(tmp);
      } else {
        if (fullTime) {
          tmp.push({
            from: hourStartMidDay + ":" + minStartMidDay,
            to: hourEndMidDay + ":" + minEndMidDay,
          });
        } else {
          tmp.push({
            from: hourStartMidDay + ":" + minStartMidDay,
            to: hourEndMidDay + ":" + minEndMidDay,
          });
          tmp.push({
            from: hourStartEvening + ":" + minStartEvening,
            to: hourEndEvening + ":" + minEndEvening,
          });
        }
        openingTime.push(tmp);
      }
    }
  }
  return openingTime;
};

export const ChangeScheduleDay: FC<ChangeScheduleDayProps> = ({
  day,
  oldOpeningTime,
  id,
  callback,
}: ChangeScheduleDayProps) => {
  const [minStartMidDay, setMinStartMidDay] = useState("00");
  const [minEndMidDay, setMinEndMidDay] = useState("00");
  const [minStartEvening, setMinStartEvening] = useState("00");
  const [minEndEvening, setMinEndEvening] = useState("00");
  const [hourStartMidDay, setHourStartMidDay] = useState("00");
  const [hourEndMidDay, setHourEndMidDay] = useState("00");
  const [hourStartEvening, setHourStartEvening] = useState("00");
  const [hourEndEvening, setHourEndEvening] = useState("00");
  const [closed, setClosed] = useState(false);
  const [fullTime, setFullTime] = useState(false);
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
      <Text style={styles.text}>{date[day]}</Text>
      <ScheduleTimePicker
        setMinStartMidDay={setMinStartMidDay}
        setMinEndMidDay={setMinEndMidDay}
        setMinStartEvening={setMinStartEvening}
        setMinEndEvening={setMinEndEvening}
        setHourStartMidDay={setHourStartMidDay}
        setHourEndMidDay={setHourEndMidDay}
        setHourStartEvening={setHourStartEvening}
        setHourEndEvening={setHourEndEvening}
        closed={closed}
        setClosed={setClosed}
        fullTime={fullTime}
        setFullTime={setFullTime}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          callback(id, {
            openingTime: changeOpeningTime({
              minStartMidDay,
              minEndMidDay,
              minStartEvening,
              minEndEvening,
              hourStartMidDay,
              hourEndMidDay,
              hourStartEvening,
              hourEndEvening,
              closed,
              fullTime,
              oldOpeningTime,
              id: day,
            }),
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
