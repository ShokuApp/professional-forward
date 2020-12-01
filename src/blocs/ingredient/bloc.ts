import { Bloc } from "@felangel/bloc";
import { IngredientEvent, IngredientGetEvent } from "./event";
import {
  IngredientErrorState,
  IngredientGetState,
  IngredientInitialState,
  IngredientLoadingState,
  IngredientState,
} from "./state";
import { IngredientRepository } from "../../repositories";

class IngredientBloc extends Bloc<IngredientEvent, IngredientState> {
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
}
