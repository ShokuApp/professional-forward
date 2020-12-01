import { Restaurant } from "../../models";

export abstract class RestaurantState {}

export class RestaurantInitialState extends RestaurantState {}

export class RestaurantLoadingState extends RestaurantState {}

export class RestaurantErrorState extends RestaurantState {}

export class RestaurantGetState extends RestaurantState {
  restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    super();

    this.restaurant = restaurant;
  }
}

export class RestaurantSetState extends RestaurantState {
  restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    super();

    this.restaurant = restaurant;
  }
}
