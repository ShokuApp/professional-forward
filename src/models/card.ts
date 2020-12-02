import { Dish } from "./dish";
import { Menu } from "./menu";

export type Card = {
  id: string;
  name: string;
  dishes: Dish[];
  menus: Menu[];
};
