import { Dish } from "../../models";

export abstract class DishState {}

export class DishInitialState extends DishState {}

export class DishLoadingState extends DishState {}

export class DishErrorState extends DishState {}

export class DishGetState extends DishState {
  dish: Dish;

  constructor(dish: Dish) {
    super();

    this.dish = dish;
  }
}

export class DishSetState extends DishState {
  dish: Dish;

  constructor(dish: Dish) {
    super();

    this.dish = dish;
  }
}

export class DishListState extends DishState {
  dishes: Dish[];

  constructor(dishes: Dish[]) {
    super();
    this.dishes = dishes;
  }
}
