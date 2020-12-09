import { RouteProp } from "@react-navigation/native";
import { Card } from "../models/card";

type RootStackParamList = {
  AddCardPlatePage: {
    type: string;
    card: Card;
  };
};

export type AddCardPlatesScreenRouteProps = RouteProp<
  RootStackParamList,
  "AddCardPlatePage"
>;
