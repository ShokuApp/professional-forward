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
      restaurantJson.current_card
    );
    const cards = await Promise.all(
      restaurantJson.cards.map(async (id) => {
        return cardRepository.get(id);
      })
    );
    const dishes = await Promise.all(
      restaurantJson.dishes.map(async (id) => {
        return dishRepository.get(id);
      })
    );

    return {
      id: restaurantJson.id,
      name: restaurantJson.name,
      description: restaurantJson.description,
      image: restaurantJson.image,
      average_rate: Number(restaurantJson.average_rate),
      average_price: restaurantJson.average_price,
      location: restaurantJson.location,
      phone: restaurantJson.phone,
      url: restaurantJson.url,
      opening_time: restaurantJson.opening_time,
      current_card,
      cards,
      dishes,
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
      current_card: restaurant.current_card.id,
      cards: restaurant.cards.map((card) => card.id),
      dishes: restaurant.dishes.map((dish) => dish.id),
    };
    const index = restaurants.findIndex((item) => item.id === restaurant.id);

    if (index !== -1) {
      restaurants[index] = restaurantJson;
    } else {
      restaurants.push(restaurantJson);
    }
  }
}
