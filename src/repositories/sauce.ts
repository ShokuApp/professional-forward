import { Repository } from "./repository";
import { Ingredient, Sauce } from "../models";

import sauces from "../../data/sauces/data.json";
import { IngredientRepository } from "./ingredient";

const ingredientRepository = new IngredientRepository();

// deepcode ignore no-any: JSON
async function fromJSON(sauceJson: any): Promise<Sauce> {
  const ingredients: Ingredient[] = await Promise.all(
    sauceJson.ingredients.map(async (id: string) => {
      return ingredientRepository.get(id);
    })
  );

  return {
    id: sauceJson.id,
    name: sauceJson.name,
    ingredients,
  };
}

function toJSON(sauce: Sauce) {
  return {
    id: sauce.id,
    name: sauce.name,
    ingredients: sauce.ingredients.map((ingredient) => ingredient.id),
  };
}

export class SauceRepository implements Repository<Sauce> {
  async get(id: string): Promise<Sauce> {
    const sauceJson = sauces.find((item) => item.id === id);

    if (sauceJson === undefined) {
      throw Error("Sauce not found");
    }

    return fromJSON(sauceJson);
  }

  async set(sauce: Sauce): Promise<void> {
    const index = sauces.findIndex((item) => item.id === sauce.id);
    const sauceJson = toJSON(sauce);

    if (index !== -1) {
      sauces[index] = sauceJson;
    } else {
      sauces.push(sauceJson);
    }
  }

  async list(): Promise<Sauce[]> {
    return Promise.all(
      sauces.map((sauceJson) => {
        return fromJSON(sauceJson);
      })
    );
  }
}
