import { Sauce } from "../../models";

export abstract class SauceEvent {}

export class SauceGetEvent extends SauceEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}

export class SauceSetEvent extends SauceEvent {
  id: string;
  sauce: Partial<Sauce>;

  constructor(id: string, sauce: Partial<Sauce>) {
    super();

    this.id = id;
    this.sauce = sauce;
  }
}

export class SauceListEvent extends SauceEvent {}
