import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TimeRange } from "../../../models";

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
  date: {
    fontSize: 18,
  },
  hoursText: {
    color: "#2196F3",
  },
  timeRanges: {
    display: "flex",
    flexDirection: "row",
  },
  eveningHours: {
    color: "#2196F3",
    marginLeft: 20,
  },
});

type TimeRangesProps = {
  openingTime: TimeRange[];
};

const TimeRanges: FC<TimeRangesProps> = ({ openingTime }: TimeRangesProps) => {
  return (
    <View style={styles.timeRanges}>
      <Text style={styles.hoursText}>
        {openingTime[0].from} - {openingTime[0].to}
      </Text>
      {openingTime[1] ? (
        <Text style={styles.eveningHours}>
          {openingTime[1].from} - {openingTime[1].to}
        </Text>
      ) : null}
    </View>
  );
};

type ScheduleItemProps = {
  openingTime: TimeRange[];
  id: number;
  schedule: TimeRange[][];
};

export const ScheduleItem: FC<ScheduleItemProps> = ({
  openingTime,
  id,
  schedule,
}: ScheduleItemProps) => {
  const date = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigate("ChangeScheduleDay", { day: id, openingTime, schedule })
      }
    >
      <Text style={styles.date}>{date[id]}</Text>
      {openingTime[0] ? (
        <TimeRanges openingTime={openingTime} />
      ) : (
        <Text style={styles.hoursText}>Fermé</Text>
      )}
    </TouchableOpacity>
  );
};
