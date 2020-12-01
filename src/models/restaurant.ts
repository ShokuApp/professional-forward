import { TimeRange } from "./time-range";
import { Image } from "./image";
import { Dish } from "./dish";
import { Card } from "./card";

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  image: Image;
  average_rate: number;
  average_price: string;
  location: string;
  phone: string;
  url: string;
  opening_time: TimeRange[][];
  current_card: Card;
  cards: Card[];
  dishes: Dish[];
};
