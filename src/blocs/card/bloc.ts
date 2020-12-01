import { Bloc } from "@felangel/bloc";
import { CardEvent, CardGetEvent, CardSetEvent } from "./event";
import {
  CardErrorState,
  CardGetState,
  CardInitialState,
  CardLoadingState,
  CardSetState,
  CardState,
} from "./state";
import { CardRepository } from "../../repositories";
import { Card } from "../../models";

class CardBloc extends Bloc<CardEvent, CardState> {
  private repository: CardRepository;

  constructor(repository: CardRepository) {
    super(new CardInitialState());

    this.repository = repository;
  }

  async *mapEventToState(event: CardEvent): AsyncIterableIterator<CardState> {
    yield new CardLoadingState();

    if (event instanceof CardGetEvent) {
      yield* this.get(event);
    } else if (event instanceof CardSetEvent) {
      yield* this.set(event);
    }
  }

  async *get(event: CardGetEvent) {
    try {
      const card = await this.repository.get(event.id);

      yield new CardGetState(card);
    } catch (e) {
      yield new CardErrorState();
    }
  }

  async *set(event: CardSetEvent) {
    try {
      const originalCard = await this.repository.get(event.id);
      const card: Card = {
        ...originalCard,
        ...event.card,
      };

      await this.repository.set(card);

      yield new CardSetState(card);
    } catch (e) {
      yield new CardErrorState();
    }
  }
}
