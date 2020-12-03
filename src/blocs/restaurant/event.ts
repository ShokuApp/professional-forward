export abstract class RestaurantEvent {}

export class RestaurantGetEvent extends RestaurantEvent {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}

export class RestaurantListEvent extends RestaurantEvent {}
