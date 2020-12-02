export abstract class ProfileEvent {}

export class ProfileGetEvent extends ProfileEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}
