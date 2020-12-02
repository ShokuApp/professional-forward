import { Sauce } from "../../models";

export abstract class SauceState {}

export class SauceInitialState extends SauceState {}

export class SauceLoadingState extends SauceState {}

export class SauceErrorState extends SauceState {}

export class SauceGetState extends SauceState {
  sauce: Sauce;

  constructor(sauce: Sauce) {
    super();

    this.sauce = sauce;
  }
}

export class SauceSetState extends SauceState {
  sauce: Sauce;

  constructor(sauce: Sauce) {
    super();

    this.sauce = sauce;
  }
}
