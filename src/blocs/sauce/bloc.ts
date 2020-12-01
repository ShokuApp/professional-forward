import { Bloc } from "@felangel/bloc";
import { SauceEvent, SauceGetEvent, SauceSetEvent } from "./event";
import {
  SauceErrorState,
  SauceGetState,
  SauceInitialState,
  SauceLoadingState,
  SauceSetState,
  SauceState,
} from "./state";
import { SauceRepository } from "../../repositories";
import { Sauce } from "../../models";

class SauceBloc extends Bloc<SauceEvent, SauceState> {
  private repository: SauceRepository;

  constructor(repository: SauceRepository) {
    super(new SauceInitialState());

    this.repository = repository;
  }

  async *mapEventToState(event: SauceEvent): AsyncIterableIterator<SauceState> {
    yield new SauceLoadingState();

    if (event instanceof SauceGetEvent) {
      yield* this.get(event);
    } else if (event instanceof SauceSetEvent) {
      yield* this.set(event);
    }
  }

  async *get(event: SauceGetEvent) {
    try {
      const sauce = await this.repository.get(event.id);

      yield new SauceGetState(sauce);
    } catch (e) {
      yield new SauceErrorState();
    }
  }

  async *set(event: SauceSetEvent) {
    try {
      const originalSauce = await this.repository.get(event.id);
      const sauce: Sauce = {
        ...originalSauce,
        ...event.sauce,
      };

      await this.repository.set(sauce);

      yield new SauceSetState(sauce);
    } catch (e) {
      yield new SauceErrorState();
    }
  }
}
