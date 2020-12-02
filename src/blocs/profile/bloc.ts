import { Bloc } from "@felangel/bloc";
import { ProfileEvent, ProfileGetEvent } from "./event";
import {
  ProfileErrorState,
  ProfileGetState,
  ProfileInitialState,
  ProfileLoadingState,
  ProfileState,
} from "./state";
import { ProfileRepository } from "../../repositories";

export class ProfileBloc extends Bloc<ProfileEvent, ProfileState> {
  private repository: ProfileRepository;

  constructor(repository: ProfileRepository) {
    super(new ProfileInitialState());

    this.repository = repository;
  }

  async *mapEventToState(
    event: ProfileEvent
  ): AsyncIterableIterator<ProfileState> {
    yield new ProfileLoadingState();

    if (event instanceof ProfileGetEvent) {
      yield* this.get(event);
    }
  }

  async *get(event: ProfileGetEvent) {
    try {
      const profile = await this.repository.get(event.id);

      yield new ProfileGetState(profile);
    } catch (e) {
      yield new ProfileErrorState();
    }
  }
}
