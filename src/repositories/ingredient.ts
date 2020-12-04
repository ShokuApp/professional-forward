import { Repository } from "./repository";
import { Ingredient, Pictogram } from "../models";

import ingredients from "../../data/ingredients/data.json";
import { PictogramRepository } from "./pictogram";

const pictogramRepository = new PictogramRepository();

// deepcode ignore no-any: JSON
async function fromJSON(ingredientJson: any): Promise<Ingredient> {
  const allergens: Pictogram[] = await Promise.all(
    ingredientJson.allergens.map(async (id: string) => {
      return pictogramRepository.get(id);
    })
  );

  const diets: Pictogram[] = await Promise.all(
    ingredientJson.allergens.map(async (id: string) => {
      return pictogramRepository.get(id);
    })
  );

  return {
    id: ingredientJson.id,
    name: ingredientJson.name,
    image: ingredientJson.image,
    allergens,
    diets,
  };
}

function toJSON(ingredient: Ingredient) {
  return {
    id: ingredient.id,
    name: ingredient.name,
    image: ingredient.image,
    allergens: ingredient.allergens.map((allergen) => allergen.id),
    diets: ingredient.diets.map((diet) => diet.id),
  };
}

export class IngredientRepository implements Repository<Ingredient> {
  async get(id: string): Promise<Ingredient> {
    const ingredientJson = ingredients.find((item) => item.id === id);

    if (ingredientJson === undefined) {
      throw Error("Ingredient not found");
    }

    return fromJSON(ingredientJson);
  }

  async set(ingredient: Ingredient): Promise<void> {
    const index = ingredients.findIndex((item) => item.id === ingredient.id);
    const ingredientJson = toJSON(ingredient);

    if (index !== -1) {
      ingredients[index] = ingredientJson;
    } else {
      ingredients.push(ingredientJson);
    }
  }

  async list(): Promise<Ingredient[]> {
    return Promise.all(
      ingredients.map((ingredientJson) => {
        return fromJSON(ingredientJson);
      })
    );
  }
}
