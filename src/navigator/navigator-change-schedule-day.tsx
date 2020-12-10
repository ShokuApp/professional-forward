import { RouteProp } from "@react-navigation/native";
import { TimeRange } from "../models";

type RootStackParamList = {
  ChangeScheduleDay: {
    day: number;
    openingTime: TimeRange[];
    schedule: TimeRange[][];
  };
};

export type ChangeScheduleDayRouteProps = RouteProp<
  RootStackParamList,
  "ChangeScheduleDay"
>;
