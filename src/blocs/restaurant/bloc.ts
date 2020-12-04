import { Bloc } from "@felangel/bloc";
import {
  RestaurantEvent,
  RestaurantGetEvent,
  RestaurantListEvent,
} from "./event";
import {
  RestaurantErrorState,
  RestaurantGetState,
  RestaurantInitialState,
  RestaurantListState,
  RestaurantLoadingState,
  RestaurantState,
} from "./state";
import { RestaurantRepository } from "../../repositories";

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

    if (event instanceof RestaurantGetEvent) {
      yield* this.get(event);
    } else if (event instanceof RestaurantListEvent) {
      yield* this.list(event);
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

  async *list(event: RestaurantListEvent) {
    try {
      const restaurants = await this.repository.list();

      yield new RestaurantListState(restaurants);
    } catch (e) {
      yield new RestaurantErrorState();
    }
  }
}
