import { Ingredient } from "./ingredient";

export type Sauce = {
  id: string;
  name: string;
  ingredients: Ingredient[];
};
