import { Repository } from "./repository";
import { Card } from "../models";

import cards from "../../data/cards/data.json";
import { MenuRepository } from "./menu";
import { DishRepository } from "./dish";

const dishRepository = new DishRepository();
const menuRepository = new MenuRepository();

export class CardRepository implements Repository<Card> {
  async get(id: string): Promise<Card> {
    const cardJson = cards.find((item) => item.id === id);

    if (cardJson === undefined) {
      throw Error("Card not found");
    }

    const dishes = await Promise.all(
      cardJson.dishes.map(async (id) => {
        return dishRepository.get(id);
      })
    );

    const menus = await Promise.all(
      cardJson.menus.map(async (id) => {
        return menuRepository.get(id);
      })
    );

    return {
      id: cardJson.id,
      name: cardJson.name,
      dishes,
      menus,
    };
  }

  async set(card: Card): Promise<void> {
    const cardJson = {
      id: card.id,
      name: card.name,
      dishes: card.dishes.map((dish) => dish.id),
      menus: card.menus.map((menu) => menu.id),
    };
    const index = cards.findIndex((item) => item.id === card.id);

    if (index !== -1) {
      cards[index] = cardJson;
    } else {
      cards.push(cardJson);
    }
  }
}
