import { Repository } from "./repository";
import { Ingredient } from "../models";

import ingredients from "../../data/ingredients/data.json";
import { PictogramRepository } from "./pictogram";

const pictogramRepository = new PictogramRepository();

export class IngredientRepository implements Repository<Ingredient> {
  async get(id: string): Promise<Ingredient> {
    const ingredientJson = ingredients.find((item) => item.id === id);

    if (ingredientJson === undefined) {
      throw Error("Ingredient not found");
    }

    const allergens = await Promise.all(
      ingredientJson.allergens_ids.map(async (id) => {
        return await pictogramRepository.get(id);
      })
    );

    const diets = await Promise.all(
      ingredientJson.allergens_ids.map(async (id) => {
        return await pictogramRepository.get(id);
      })
    );

    return {
      id: ingredientJson.id,
      name: ingredientJson.name,
      image: ingredientJson.image,
      allergens: allergens,
      diets: diets,
    };
  }

  async set(ingredient: Ingredient): Promise<void> {
    const ingredientJson = {
      id: ingredient.id,
      name: ingredient.name,
      image: ingredient.image,
      allergens_ids: ingredient.allergens.map((allergen) => allergen.id),
      diets_ids: ingredient.diets.map((diet) => diet.id),
    };
    const index = ingredients.findIndex((item) => item.id === ingredient.id);

    if (index !== -1) {
      ingredients[index] = ingredientJson;
    } else {
      ingredients.push(ingredientJson);
    }
  }
}
