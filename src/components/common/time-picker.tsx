import React, { FC, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#2196F3",
    borderRadius: 5,
    borderWidth: 2,
  },
  closedContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
  },
  input: {
    width: 40,
    paddingVertical: 5,
  },
  hourInput: {
    textAlign: "right",
    paddingLeft: 10,
  },
  minuteInput: {
    paddingRight: 10,
  },
  text: {
    color: "#2196F3",
    fontSize: 24,
  },
  closedText: {
    color: "#9A9A9A",
    fontSize: 24,
  },
});

type Props = {
  onHoursChange: (hours: string) => void;
  onMinutesChange: (minutes: string) => void;
  closed: boolean;
};

export const TimePicker: FC<Props> = (props) => {
  const [hours, setHours] = useState<string>("00");
  const [minutes, setMinutes] = useState<string>("00");
  const minuteRef = useRef<TextInput>(null);

  const onChange = (
    text: string,
    setText: (text: string) => void,
    maxValue: number
  ) => {
    text = text.replace(/\D/g, "");

    if (text.length > 2) {
      text = text.substr(text.length - 2);
    }

    if (parseInt(text, 10) > maxValue) {
      text = "0" + text.charAt(text.length - 1);
    }

    setText(text);

    return text;
  };

  const onEnd = (text: string, setText: (text: string) => void) => {
    if (text.length < 2) {
      text = "0".repeat(2 - text.length) + text;
    }

    setText(text);

    return text;
  };

  return (
    <View style={props.closed ? styles.closedContainer : styles.container}>
      <TextInput
        keyboardType={"number-pad"}
        style={[
          styles.input,
          styles.hourInput,
          props.closed ? styles.closedText : styles.text,
        ]}
        selectionColor={props.closed ? "#9A9A9A" : "#2196F3"}
        value={hours}
        editable={props.closed ? false : true}
        onChangeText={(text) => {
          const newHours = onChange(text, setHours, 24);

          props.onHoursChange(newHours);
        }}
        onEndEditing={() => {
          const newHours = onEnd(hours, setHours);

          props.onHoursChange(newHours);
        }}
      />
      <Text style={props.closed ? styles.closedText : styles.text}>:</Text>
      <TextInput
        ref={minuteRef}
        keyboardType={"number-pad"}
        style={[
          styles.input,
          styles.minuteInput,
          props.closed ? styles.closedText : styles.text,
        ]}
        selectionColor={props.closed ? "#9A9A9A" : "#2196F3"}
        value={minutes}
        editable={props.closed ? false : true}
        onChangeText={(text) => {
          const newMinutes = onChange(text, setMinutes, 60);

          props.onMinutesChange(newMinutes);
        }}
        onEndEditing={() => {
          const newMinutes = onEnd(minutes, setMinutes);

          props.onMinutesChange(newMinutes);
        }}
      />
    </View>
  );
};
