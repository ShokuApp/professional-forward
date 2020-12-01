import { Bloc } from "@felangel/bloc";
import { PictogramEvent, PictogramGetEvent } from "./event";
import {
  PictogramErrorState,
  PictogramGetState,
  PictogramInitialState,
  PictogramLoadingState,
  PictogramState,
} from "./state";
import { PictogramRepository } from "../../repositories";

class PictogramBloc extends Bloc<PictogramEvent, PictogramState> {
  private repository: PictogramRepository;

  constructor(repository: PictogramRepository) {
    super(new PictogramInitialState());

    this.repository = repository;
  }

  async *mapEventToState(
    event: PictogramEvent
  ): AsyncIterableIterator<PictogramState> {
    yield new PictogramLoadingState();

    if (event instanceof PictogramGetEvent) {
      yield* this.get(event);
    }
  }

  async *get(event: PictogramGetEvent) {
    try {
      const pictogram = await this.repository.get(event.id);

      yield new PictogramGetState(pictogram);
    } catch (e) {
      yield new PictogramErrorState();
    }
  }
}
