import { Repository } from "./repository";
import { Dish, Menu } from "../models";

import menus from "../../data/menus/data.json";
import { DishRepository } from "./dish";

const dishRepository = new DishRepository();

// deepcode ignore no-any: JSON
async function fromJSON(menuJson: any): Promise<Menu> {
  const dishes: Dish[] = await Promise.all(
    menuJson.dishes.map(async (id: string) => {
      return dishRepository.get(id);
    })
  );

  return {
    id: menuJson.id,
    name: menuJson.name,
    price: Number(menuJson.price),
    dishes,
  };
}

function toJSON(menu: Menu) {
  return {
    id: menu.id,
    name: menu.name,
    price: menu.price.toString(),
    dishes: menu.dishes.map((dish) => dish.id),
  };
}

export class MenuRepository implements Repository<Menu> {
  async get(id: string): Promise<Menu> {
    const menuJson = menus.find((item) => item.id === id);

    if (menuJson === undefined) {
      throw Error("Menu not found");
    }

    return fromJSON(menuJson);
  }

  async set(menu: Menu): Promise<void> {
    const index = menus.findIndex((item) => item.id === menu.id);
    const menuJson = toJSON(menu);

    if (index !== -1) {
      menus[index] = menuJson;
    } else {
      menus.push(menuJson);
    }
  }

  async list(): Promise<Menu[]> {
    return Promise.all(
      menus.map((menuJson) => {
        return fromJSON(menuJson);
      })
    );
  }
}
