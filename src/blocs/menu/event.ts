import { Menu } from "../../models";

export abstract class MenuEvent {}

export class MenuCreateEvent extends MenuEvent {
  menu: Menu;

  constructor(menu: Menu) {
    super();

    this.menu = menu;
  }
}

export class MenuGetEvent extends MenuEvent {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}

export class MenuSetEvent extends MenuEvent {
  id: string;
  menu: Partial<Menu>;

  constructor(id: string, menu: Partial<Menu>) {
    super();

    this.id = id;
    this.menu = menu;
  }
}

export class MenuListEvent extends MenuEvent {}
