import React, { FC, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Restaurant } from "../../../models";
import { DayPickers } from "./day-pickers";
import { ScheduleTimePicker } from "./schedule-time-picker";
import { TimeRange } from "../../../models";
import { useNavigation } from "@react-navigation/native";

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

type newOpeningTime = {
  days: boolean[];
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
};

const changeOpeningTime: (newOpeningTime: newOpeningTime) => TimeRange[][] = ({
  days,
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
}: newOpeningTime) => {
  const openingTime: TimeRange[][] = [];
  for (const idx in days) {
    if (!days[idx]) {
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
  return (
    <ScrollView style={styles.container}>
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
      <DayPickers days={days} setDays={setDays} date={date} />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          callback(restaurant.id, {
            openingTime: changeOpeningTime({
              days,
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
              oldOpeningTime: restaurant.openingTime,
            }),
          });
        }}
      >
        <View style={styles.button}>
          <Text style={styles.textButton}>Appliquer</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
