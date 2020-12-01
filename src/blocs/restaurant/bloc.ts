import { Bloc } from "@felangel/bloc";
import {
  RestaurantEvent,
  RestaurantGetEvent,
  RestaurantSetEvent,
} from "./event";
import {
  RestaurantErrorState,
  RestaurantGetState,
  RestaurantInitialState,
  RestaurantLoadingState,
  RestaurantSetState,
  RestaurantState,
} from "./state";
import { RestaurantRepository } from "../../repositories";
import { Restaurant } from "../../models";

class RestaurantBloc extends Bloc<RestaurantEvent, RestaurantState> {
  private repository: RestaurantRepository;

  constructor(repository: RestaurantRepository) {
    super(new RestaurantInitialState());

    this.repository = repository;
  }

  async *mapEventToState(
    event: RestaurantEvent
  ): AsyncIterableIterator<RestaurantState> {
    yield new RestaurantLoadingState();

    if (event instanceof RestaurantGetEvent) {
      yield* this.get(event);
    } else if (event instanceof RestaurantSetEvent) {
      yield* this.set(event);
    }
  }

  async *get(event: RestaurantGetEvent) {
    try {
      const restaurant = await this.repository.get(event.id);

      yield new RestaurantGetState(restaurant);
    } catch (e) {
      yield new RestaurantErrorState();
    }
  }

  async *set(event: RestaurantSetEvent) {
    try {
      const originalRestaurant = await this.repository.get(event.id);
      const restaurant: Restaurant = {
        ...originalRestaurant,
        ...event.restaurant,
      };

      await this.repository.set(restaurant);

      yield new RestaurantSetState(restaurant);
    } catch (e) {
      yield new RestaurantErrorState();
    }
  }
}
