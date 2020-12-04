import { Dish } from "../../models";

export abstract class DishEvent {}

export class DishGetEvent extends DishEvent {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}

export class DishSetEvent extends DishEvent {
  id: string;
  dish: Partial<Dish>;

  constructor(id: string, dish: Partial<Dish>) {
    super();

    this.id = id;
    this.dish = dish;
  }
}

export class DishListEvent extends DishEvent {}
