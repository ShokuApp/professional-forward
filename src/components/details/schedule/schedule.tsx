import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { TimeRange } from "../../../models";
import { ScheduleItem } from "./schedule-item";

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    display: "flex",
    flexDirection: "column",
  },
});

type ScheduleProps = {
  openingTime: TimeRange[][];
};

export const Schedule: FC<ScheduleProps> = ({ openingTime }: ScheduleProps) => {
  return (
    <View style={styles.container}>
      {openingTime.map((time, id) => {
        return (
          <ScheduleItem
            openingTime={time}
            key={id}
            id={id}
            schedule={openingTime}
          />
        );
      })}
    </View>
  );
};
