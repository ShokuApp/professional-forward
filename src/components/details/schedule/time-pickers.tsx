import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TimePicker } from "../../common/time-picker";
import { ChooseTimePicker } from "./choose-time-picker";

const styles = StyleSheet.create({
  container: {},
});

type TimePickersProps = {
  setMinStartMidDay: (min: string) => void;
  setMinEndMidDay: (min: string) => void;
  setMinStartEvening: (min: string) => void;
  setMinEndEvening: (min: string) => void;
  setHourStartMidDay: (hour: string) => void;
  setHourEndMidDay: (hour: string) => void;
  setHourStartEvening: (hour: string) => void;
  setHourEndEvening: (hour: string) => void;
  closed: boolean;
  fullService: boolean;
};
export const TimePickers: FC<TimePickersProps> = ({
  setMinStartMidDay,
  setMinEndMidDay,
  setMinStartEvening,
  setMinEndEvening,
  setHourStartMidDay,
  setHourEndMidDay,
  setHourStartEvening,
  setHourEndEvening,
  closed,
  fullService,
}: TimePickersProps) => {
  return (
    <View>
      {!fullService ? (
        <View>
          <ChooseTimePicker
            setMinStart={setMinStartMidDay}
            setHourStart={setHourStartMidDay}
            setMinEnd={setMinEndMidDay}
            setHourEnd={setHourEndMidDay}
            closed={closed}
            label={"Midi"}
            fullTime={fullService}
          />
          <ChooseTimePicker
            setMinStart={setMinStartEvening}
            setHourStart={setHourStartEvening}
            setMinEnd={setMinEndEvening}
            setHourEnd={setHourEndEvening}
            closed={closed}
            label={"Soir"}
            fullTime={fullService}
          />
        </View>
      ) : (
        <ChooseTimePicker
          setMinStart={setMinStartMidDay}
          setHourStart={setHourStartMidDay}
          setMinEnd={setMinEndMidDay}
          setHourEnd={setHourEndMidDay}
          closed={closed}
          label={""}
          fullTime={fullService}
        />
      )}
    </View>
  );
};
