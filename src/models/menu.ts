import { Dish } from "./dish";

export type Menu = {
  id: string;
  name: string;
  price: string;
  dishes: Dish[];
};
