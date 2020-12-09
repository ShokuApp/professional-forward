import { Card } from "../../models";

export abstract class CardEvent {}

export class CardCreateEvent extends CardEvent {
  card: Card;

  constructor(card: Card) {
    super();

    this.card = card;
  }
}

export class CardGetEvent extends CardEvent {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}

export class CardSetEvent extends CardEvent {
  id: string;
  card: Partial<Card>;

  constructor(id: string, card: Partial<Card>) {
    super();

    this.id = id;
    this.card = card;
  }
}

export class CardListEvent extends CardEvent {}
