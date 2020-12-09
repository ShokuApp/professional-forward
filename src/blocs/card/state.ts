import { Card } from "../../models";

export abstract class CardState {}

export class CardInitialState extends CardState {}

export class CardLoadingState extends CardState {}

export class CardErrorState extends CardState {}

export class CardCreateState extends CardState {}

export class CardGetState extends CardState {
  card: Card;

  constructor(card: Card) {
    super();

    this.card = card;
  }
}

export class CardSetState extends CardState {
  card: Card;

  constructor(card: Card) {
    super();

    this.card = card;
  }
}

export class CardListState extends CardState {
  cards: Card[];

  constructor(cards: Card[]) {
    super();
    this.cards = cards;
  }
}
