import { Repository } from "./repository";
import { Sauce } from "../models";

import sauces from "../../data/sauces/data.json";
import { IngredientRepository } from "./ingredient";

const ingredientRepository = new IngredientRepository();

export class SauceRepository implements Repository<Sauce> {
  async get(id: string): Promise<Sauce> {
    const sauceJson = sauces.find((item) => item.id === id);

    if (sauceJson === undefined) {
      throw Error("Sauce not found");
    }

    const ingredients = await Promise.all(
      sauceJson.ingredients_ids.map(async (id) => {
        return ingredientRepository.get(id);
      })
    );

    return {
      id: sauceJson.id,
      name: sauceJson.name,
      ingredients,
    };
  }

  async set(sauce: Sauce): Promise<void> {
    const sauceJson = {
      id: sauce.id,
      name: sauce.name,
      ingredients_ids: sauce.ingredients.map((ingredient) => ingredient.id),
    };
    const index = sauces.findIndex((item) => item.id === sauce.id);

    if (index !== -1) {
      sauces[index] = sauceJson;
    } else {
      sauces.push(sauceJson);
    }
  }
}
