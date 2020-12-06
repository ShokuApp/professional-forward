import { Bloc } from "@felangel/bloc";
import {
  MenuCreateEvent,
  MenuEvent,
  MenuGetEvent,
  MenuListEvent,
  MenuSetEvent,
} from "./event";
import {
  MenuCreateState,
  MenuErrorState,
  MenuGetState,
  MenuInitialState,
  MenuListState,
  MenuLoadingState,
  MenuSetState,
  MenuState,
} from "./state";
import { MenuRepository } from "../../repositories";
import { Menu } from "../../models";

export class MenuBloc extends Bloc<MenuEvent, MenuState> {
  private repository: MenuRepository;

  constructor(repository: MenuRepository) {
    super(new MenuInitialState());

    this.repository = repository;
  }

  async *mapEventToState(event: MenuEvent): AsyncIterableIterator<MenuState> {
    yield new MenuLoadingState();

    if (event instanceof MenuCreateEvent) {
      yield* this.create(event);
    } else if (event instanceof MenuGetEvent) {
      yield* this.get(event);
    } else if (event instanceof MenuSetEvent) {
      yield* this.set(event);
    } else if (event instanceof MenuListEvent) {
      yield* this.list(event);
    }
  }

  async *create(event: MenuCreateEvent) {
    try {
      await this.repository.set(event.menu);

      yield new MenuCreateState();
    } catch (e) {
      yield new MenuErrorState();
    }
  }

  async *get(event: MenuGetEvent) {
    try {
      const menu = await this.repository.get(event.id);

      yield new MenuGetState(menu);
    } catch (e) {
      yield new MenuErrorState();
    }
  }

  async *set(event: MenuSetEvent) {
    try {
      const originalMenu = await this.repository.get(event.id);
      const menu: Menu = {
        ...originalMenu,
        ...event.menu,
      };

      await this.repository.set(menu);

      yield new MenuSetState(menu);
    } catch (e) {
      yield new MenuErrorState();
    }
  }

  async *list(event: MenuListEvent) {
    try {
      const menus = await this.repository.list();

      yield new MenuListState(menus);
    } catch (e) {
      yield new MenuErrorState();
    }
  }
}
