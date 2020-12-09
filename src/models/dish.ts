import { Sauce } from "./sauce";
import { Ingredient } from "./ingredient";

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  ingredients: Ingredient[];
  sauces: Sauce[];
  isAdaptable: boolean;
};
