export abstract class IngredientEvent {}

export class IngredientGetEvent extends IngredientEvent {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}
