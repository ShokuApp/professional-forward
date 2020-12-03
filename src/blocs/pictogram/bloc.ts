import { Bloc } from "@felangel/bloc";
import { PictogramEvent, PictogramGetEvent, PictogramListEvent } from "./event";
import {
  PictogramErrorState,
  PictogramGetState,
  PictogramInitialState,
  PictogramListState,
  PictogramLoadingState,
  PictogramState,
} from "./state";
import { PictogramRepository } from "../../repositories";

export class PictogramBloc extends Bloc<PictogramEvent, PictogramState> {
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
    } else if (event instanceof PictogramListEvent) {
      yield* this.list(event);
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

  async *list(event: PictogramListEvent) {
    try {
      const pictograms = await this.repository.list();

      yield new PictogramListState(pictograms);
    } catch (e) {
      yield new PictogramErrorState();
    }
  }
}
