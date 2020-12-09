import { Bloc } from "@felangel/bloc";
import {
  SauceCreateEvent,
  SauceEvent,
  SauceGetEvent,
  SauceListEvent,
  SauceSetEvent,
} from "./event";
import {
  SauceCreateState,
  SauceErrorState,
  SauceGetState,
  SauceInitialState,
  SauceListState,
  SauceLoadingState,
  SauceSetState,
  SauceState,
} from "./state";
import { SauceRepository } from "../../repositories";
import { Sauce } from "../../models";

export class SauceBloc extends Bloc<SauceEvent, SauceState> {
  private repository: SauceRepository;

  constructor(repository: SauceRepository) {
    super(new SauceInitialState());

    this.repository = repository;
  }

  async *mapEventToState(event: SauceEvent): AsyncIterableIterator<SauceState> {
    yield new SauceLoadingState();

    if (event instanceof SauceCreateEvent) {
      yield* this.create(event);
    } else if (event instanceof SauceGetEvent) {
      yield* this.get(event);
    } else if (event instanceof SauceSetEvent) {
      yield* this.set(event);
    } else if (event instanceof SauceListEvent) {
      yield* this.list(event);
    }
  }

  async *create(event: SauceCreateEvent) {
    try {
      await this.repository.set(event.sauce);

      yield new SauceCreateState();
    } catch (e) {
      yield new SauceErrorState();
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

  async *list(event: SauceListEvent) {
    try {
      const sauces = await this.repository.list();

      yield new SauceListState(sauces);
    } catch (e) {
      yield new SauceErrorState();
    }
  }
}
