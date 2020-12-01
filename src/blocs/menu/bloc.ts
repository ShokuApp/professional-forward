import { Bloc } from "@felangel/bloc";
import { MenuEvent, MenuGetEvent, MenuSetEvent } from "./event";
import {
  MenuErrorState,
  MenuGetState,
  MenuInitialState,
  MenuLoadingState,
  MenuSetState,
  MenuState,
} from "./state";
import { MenuRepository } from "../../repositories";
import { Menu } from "../../models";

class MenuBloc extends Bloc<MenuEvent, MenuState> {
  private repository: MenuRepository;

  constructor(repository: MenuRepository) {
    super(new MenuInitialState());

    this.repository = repository;
  }

  async *mapEventToState(event: MenuEvent): AsyncIterableIterator<MenuState> {
    yield new MenuLoadingState();

    if (event instanceof MenuGetEvent) {
      yield* this.get(event);
    } else if (event instanceof MenuSetEvent) {
      yield* this.set(event);
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
}
