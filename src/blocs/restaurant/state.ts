import { Restaurant } from "../../models";

export abstract class RestaurantState {}

export class RestaurantInitialState extends RestaurantState {}

export class RestaurantLoadingState extends RestaurantState {}

export class RestaurantErrorState extends RestaurantState {}

export class RestaurantCreateState extends RestaurantState {}

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

export class RestaurantListState extends RestaurantState {
  restaurants: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    super();
    this.restaurants = restaurants;
  }
}
