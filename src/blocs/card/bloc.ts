import { Bloc } from "@felangel/bloc";
import {
  CardCreateEvent,
  CardEvent,
  CardGetEvent,
  CardListEvent,
  CardSetEvent,
} from "./event";
import {
  CardCreateState,
  CardErrorState,
  CardGetState,
  CardInitialState,
  CardListState,
  CardLoadingState,
  CardSetState,
  CardState,
} from "./state";
import { CardRepository } from "../../repositories";
import { Card } from "../../models";

export class CardBloc extends Bloc<CardEvent, CardState> {
  private repository: CardRepository;

  constructor(repository: CardRepository) {
    super(new CardInitialState());

    this.repository = repository;
  }

  async *mapEventToState(event: CardEvent): AsyncIterableIterator<CardState> {
    yield new CardLoadingState();

    if (event instanceof CardCreateEvent) {
      yield* this.create(event);
    } else if (event instanceof CardGetEvent) {
      yield* this.get(event);
    } else if (event instanceof CardSetEvent) {
      yield* this.set(event);
    } else if (event instanceof CardListEvent) {
      yield* this.list(event);
    }
  }

  async *create(event: CardCreateEvent) {
    try {
      await this.repository.set(event.card);

      yield new CardCreateState();
    } catch (e) {
      yield new CardErrorState();
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

  async *list(event: CardListEvent) {
    try {
      const cards = await this.repository.list();

      yield new CardListState(cards);
    } catch (e) {
      yield new CardErrorState();
    }
  }
}
