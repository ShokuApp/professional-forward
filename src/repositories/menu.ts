import { Repository } from "./repository";
import { Menu } from "../models";

import menus from "../../data/menus/data.json";
import { DishRepository } from "./dish";

const dishRepository = new DishRepository();

export class MenuRepository implements Repository<Menu> {
  async get(id: string): Promise<Menu> {
    const menuJson = menus.find((item) => item.id === id);

    if (menuJson === undefined) {
      throw Error("Menu not found");
    }

    const dishes = await Promise.all(
      menuJson.dishes.map(async (id) => {
        return dishRepository.get(id);
      })
    );

    return {
      id: menuJson.id,
      name: menuJson.name,
      price: menuJson.price,
      dishes,
    };
  }

  async set(menu: Menu): Promise<void> {
    const menuJson = {
      id: menu.id,
      name: menu.name,
      price: menu.price,
      dishes: menu.dishes.map((dish) => dish.id),
    };
    const index = menus.findIndex((item) => item.id === menu.id);

    if (index !== -1) {
      menus[index] = menuJson;
    } else {
      menus.push(menuJson);
    }
  }
}
