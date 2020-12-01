import { Repository } from "./repository";
import { Restaurant } from "../models";

import restaurants from "../../data/restaurants/data.json";
import { CardRepository } from "./card";
import { DishRepository } from "./dish";

const cardRepository = new CardRepository();
const dishRepository = new DishRepository();

export class RestaurantRepository implements Repository<Restaurant> {
  async get(id: string): Promise<Restaurant> {
    const restaurantJson = restaurants.find((item) => item.id === id);

    if (restaurantJson === undefined) {
      throw Error("Restaurant not found");
    }

    const current_card = await cardRepository.get(
      restaurantJson.current_card_id
    );
    const cards = await Promise.all(
      restaurantJson.cards_ids.map(async (id) => {
        return await cardRepository.get(id);
      })
    );
    const dishes = await Promise.all(
      restaurantJson.dishes_ids.map(async (id) => {
        return await dishRepository.get(id);
      })
    );

    return {
      id: restaurantJson.id,
      name: restaurantJson.name,
      description: restaurantJson.description,
      image: restaurantJson.image,
      average_rate: parseFloat(restaurantJson.average_rate),
      average_price: restaurantJson.average_price,
      location: restaurantJson.location,
      phone: restaurantJson.phone,
      url: restaurantJson.url,
      opening_time: restaurantJson.opening_time,
      current_card: current_card,
      cards: cards,
      dishes: dishes,
    };
  }

  async set(restaurant: Restaurant): Promise<void> {
    const restaurantJson = {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      image: restaurant.image,
      average_rate: restaurant.average_rate.toString(),
      average_price: restaurant.average_price,
      location: restaurant.location,
      phone: restaurant.phone,
      url: restaurant.url,
      opening_time: restaurant.opening_time,
      current_card_id: restaurant.current_card.id,
      cards_ids: restaurant.cards.map((card) => card.id),
      dishes_ids: restaurant.dishes.map((dish) => dish.id),
    };
    const index = restaurants.findIndex((item) => item.id === restaurant.id);

    if (index !== -1) {
      restaurants[index] = restaurantJson;
    } else {
      restaurants.push(restaurantJson);
    }
  }
}
