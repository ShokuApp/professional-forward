import { Bloc } from "@felangel/bloc";
import {
  DishCreateEvent,
  DishEvent,
  DishGetEvent,
  DishListEvent,
  DishSetEvent,
} from "./event";
import {
  DishCreateState,
  DishErrorState,
  DishGetState,
  DishInitialState,
  DishListState,
  DishLoadingState,
  DishSetState,
  DishState,
} from "./state";
import { DishRepository } from "../../repositories";
import { Dish } from "../../models";

export class DishBloc extends Bloc<DishEvent, DishState> {
  private repository: DishRepository;

  constructor(repository: DishRepository) {
    super(new DishInitialState());

    this.repository = repository;
  }

  async *mapEventToState(event: DishEvent): AsyncIterableIterator<DishState> {
    yield new DishLoadingState();

    if (event instanceof DishCreateEvent) {
      yield* this.create(event);
    } else if (event instanceof DishGetEvent) {
      yield* this.get(event);
    } else if (event instanceof DishSetEvent) {
      yield* this.set(event);
    } else if (event instanceof DishListEvent) {
      yield* this.list(event);
    }
  }

  async *create(event: DishCreateEvent) {
    try {
      await this.repository.set(event.dish);

      yield new DishCreateState();
    } catch (e) {
      yield new DishErrorState();
    }
  }

  async *get(event: DishGetEvent) {
    try {
      const dish = await this.repository.get(event.id);

      yield new DishGetState(dish);
    } catch (e) {
      yield new DishErrorState();
    }
  }

  async *set(event: DishSetEvent) {
    try {
      const originalDish = await this.repository.get(event.id);
      const dish: Dish = {
        ...originalDish,
        ...event.dish,
      };

      await this.repository.set(dish);

      yield new DishSetState(dish);
    } catch (e) {
      yield new DishErrorState();
    }
  }

  async *list(event: DishListEvent) {
    try {
      const dishes = await this.repository.list();

      yield new DishListState(dishes);
    } catch (e) {
      yield new DishErrorState();
    }
  }
}
