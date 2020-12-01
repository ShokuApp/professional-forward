import { Pictogram } from "./pictogram";
import { Image } from "./image";

export type Ingredient = {
  id: string;
  name: string;
  image: Image;
  allergens: Pictogram[];
  diets: Pictogram[];
};
