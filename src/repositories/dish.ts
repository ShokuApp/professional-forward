import { Repository } from "./repository";
import { Dish, Ingredient, Sauce } from "../models";

import dishes from "../../data/dishes/data.json";
import { IngredientRepository } from "./ingredient";
import { SauceRepository } from "./sauce";

const ingredientRepository = new IngredientRepository();
const sauceRepository = new SauceRepository();

// deepcode ignore no-any: JSON
async function fromJSON(dishJson: any): Promise<Dish> {
  const ingredients: Ingredient[] = await Promise.all(
    dishJson.ingredients.map(async (id: string) => {
      return ingredientRepository.get(id);
    })
  );

  const sauces: Sauce[] = await Promise.all(
    dishJson.sauces.map(async (id: string) => {
      return sauceRepository.get(id);
    })
  );

  return {
    id: dishJson.id,
    name: dishJson.name,
    description: dishJson.description,
    type: dishJson.type,
    price: Number(dishJson.price),
    isAdaptable: Boolean(dishJson.is_adaptable),
    ingredients,
    sauces,
  };
}

function toJSON(dish: Dish) {
  return {
    id: dish.id,
    name: dish.name,
    description: dish.description,
    type: dish.type,
    price: dish.price.toString(),
    ingredients: dish.ingredients.map((ingredient) => ingredient.id),
    sauces: dish.sauces.map((sauce) => sauce.id),
    is_adaptable: String(dish.isAdaptable),
  };
}

export class DishRepository implements Repository<Dish> {
  async get(id: string): Promise<Dish> {
    const dishJson = dishes.find((item) => item.id === id);

    if (dishJson === undefined) {
      throw Error("Dish not found");
    }

    return fromJSON(dishJson);
  }

  async set(dish: Dish): Promise<void> {
    const index = dishes.findIndex((item) => item.id === dish.id);
    const dishJson = toJSON(dish);

    if (index !== -1) {
      dishes[index] = dishJson;
    } else {
      dishes.push(dishJson);
    }
  }

  async list(): Promise<Dish[]> {
    return Promise.all(
      dishes.map((dishJson) => {
        return fromJSON(dishJson);
      })
    );
  }
}
