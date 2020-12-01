export abstract class PictogramEvent {}

export class PictogramGetEvent extends PictogramEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}
