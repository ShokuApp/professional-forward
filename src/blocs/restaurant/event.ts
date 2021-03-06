import { Restaurant } from "../../models";

export abstract class RestaurantEvent {}

export class RestaurantCreateEvent extends RestaurantEvent {
  restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    super();

    this.restaurant = restaurant;
  }
}

export class RestaurantGetEvent extends RestaurantEvent {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}

export class RestaurantSetEvent extends RestaurantEvent {
  id: string;
  restaurant: Partial<Restaurant>;

  constructor(id: string, restaurant: Partial<Restaurant>) {
    super();

    this.id = id;
    this.restaurant = restaurant;
  }
}

export class RestaurantListEvent extends RestaurantEvent {}
