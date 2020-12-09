import { Bloc } from "@felangel/bloc";
import {
  RestaurantCreateEvent,
  RestaurantEvent,
  RestaurantGetEvent,
  RestaurantListEvent,
  RestaurantSetEvent,
} from "./event";
import {
  RestaurantCreateState,
  RestaurantErrorState,
  RestaurantGetState,
  RestaurantInitialState,
  RestaurantListState,
  RestaurantLoadingState,
  RestaurantSetState,
  RestaurantState,
} from "./state";
import { RestaurantRepository } from "../../repositories";
import { Restaurant } from "../../models";

export class RestaurantBloc extends Bloc<RestaurantEvent, RestaurantState> {
  private repository: RestaurantRepository;

  constructor(repository: RestaurantRepository) {
    super(new RestaurantInitialState());

    this.repository = repository;
  }

  async *mapEventToState(
    event: RestaurantEvent
  ): AsyncIterableIterator<RestaurantState> {
    yield new RestaurantLoadingState();

    if (event instanceof RestaurantCreateEvent) {
      yield* this.create(event);
    } else if (event instanceof RestaurantGetEvent) {
      yield* this.get(event);
    } else if (event instanceof RestaurantSetEvent) {
      yield* this.set(event);
    } else if (event instanceof RestaurantListEvent) {
      yield* this.list(event);
    }
  }

  async *create(event: RestaurantCreateEvent) {
    try {
      await this.repository.set(event.restaurant);

      yield new RestaurantCreateState();
    } catch (e) {
      yield new RestaurantErrorState();
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

  async *list(event: RestaurantListEvent) {
    try {
      const restaurants = await this.repository.list();

      yield new RestaurantListState(restaurants);
    } catch (e) {
      yield new RestaurantErrorState();
    }
  }
}
