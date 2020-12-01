import { Repository } from "./repository";
import { Dish } from "../models";

import dishes from "../../data/dishes/data.json";
import { IngredientRepository } from "./ingredient";
import { SauceRepository } from "./sauce";

const ingredientRepository = new IngredientRepository();
const sauceRepository = new SauceRepository();

export class DishRepository implements Repository<Dish> {
  async get(id: string): Promise<Dish> {
    const dishJson = dishes.find((item) => item.id === id);

    if (dishJson === undefined) {
      throw Error("Dish not found");
    }

    const ingredients = await Promise.all(
      dishJson.ingredients_ids.map(async (id) => {
        return await ingredientRepository.get(id);
      })
    );

    const sauces = await Promise.all(
      dishJson.sauces_ids.map(async (id) => {
        return await sauceRepository.get(id);
      })
    );

    return {
      id: dishJson.id,
      name: dishJson.name,
      description: dishJson.description,
      price: dishJson.price,
      ingredients: ingredients,
      sauces: sauces,
    };
  }

  async set(dish: Dish): Promise<void> {
    const dishJson = {
      id: dish.id,
      name: dish.name,
      description: dish.description,
      price: dish.price,
      ingredients_ids: dish.ingredients.map((ingredient) => ingredient.id),
      sauces_ids: dish.sauces.map((sauce) => sauce.id),
    };
    const index = dishes.findIndex((item) => item.id === dish.id);

    if (index !== -1) {
      dishes[index] = dishJson;
    } else {
      dishes.push(dishJson);
    }
  }
}
