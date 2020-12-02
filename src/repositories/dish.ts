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
      dishJson.ingredients.map(async (id) => {
        return ingredientRepository.get(id);
      })
    );

    const sauces = await Promise.all(
      dishJson.sauces.map(async (id) => {
        return sauceRepository.get(id);
      })
    );

    return {
      id: dishJson.id,
      name: dishJson.name,
      description: dishJson.description,
      type: dishJson.type,
      price: dishJson.price,
      ingredients,
      sauces,
    };
  }

  async set(dish: Dish): Promise<void> {
    const dishJson = {
      id: dish.id,
      name: dish.name,
      description: dish.description,
      type: dish.type,
      price: dish.price,
      ingredients: dish.ingredients.map((ingredient) => ingredient.id),
      sauces: dish.sauces.map((sauce) => sauce.id),
    };
    const index = dishes.findIndex((item) => item.id === dish.id);

    if (index !== -1) {
      dishes[index] = dishJson;
    } else {
      dishes.push(dishJson);
    }
  }
}
