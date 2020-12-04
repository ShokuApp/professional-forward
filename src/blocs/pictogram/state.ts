import { Pictogram } from "../../models";

export abstract class PictogramState {}

export class PictogramInitialState extends PictogramState {}

export class PictogramLoadingState extends PictogramState {}

export class PictogramErrorState extends PictogramState {}

export class PictogramGetState extends PictogramState {
  pictogram: Pictogram;

  constructor(pictogram: Pictogram) {
    super();
    this.pictogram = pictogram;
  }
}

export class PictogramListState extends PictogramState {
  pictograms: Pictogram[];

  constructor(pictograms: Pictogram[]) {
    super();
    this.pictograms = pictograms;
  }
}
