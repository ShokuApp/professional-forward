import { Bloc } from "@felangel/bloc";
import {
  IngredientEvent,
  IngredientGetEvent,
  IngredientListEvent,
} from "./event";
import {
  IngredientErrorState,
  IngredientGetState,
  IngredientInitialState,
  IngredientListState,
  IngredientLoadingState,
  IngredientState,
} from "./state";
import { IngredientRepository } from "../../repositories";

export class IngredientBloc extends Bloc<IngredientEvent, IngredientState> {
  private repository: IngredientRepository;

  constructor(repository: IngredientRepository) {
    super(new IngredientInitialState());

    this.repository = repository;
  }

  async *mapEventToState(
    event: IngredientEvent
  ): AsyncIterableIterator<IngredientState> {
    yield new IngredientLoadingState();

    if (event instanceof IngredientGetEvent) {
      yield* this.get(event);
    } else if (event instanceof IngredientListEvent) {
      yield* this.list(event);
    }
  }

  async *get(event: IngredientGetEvent) {
    try {
      const ingredient = await this.repository.get(event.id);

      yield new IngredientGetState(ingredient);
    } catch (e) {
      yield new IngredientErrorState();
    }
  }

  async *list(event: IngredientListEvent) {
    try {
      const ingredients = await this.repository.list();

      yield new IngredientListState(ingredients);
    } catch (e) {
      yield new IngredientErrorState();
    }
  }
}
