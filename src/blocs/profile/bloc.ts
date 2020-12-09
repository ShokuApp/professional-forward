import { Bloc } from "@felangel/bloc";
import {
  ProfileCreateEvent,
  ProfileEvent,
  ProfileGetEvent,
  ProfileListEvent,
  ProfileSetEvent,
} from "./event";
import {
  ProfileCreateState,
  ProfileErrorState,
  ProfileGetState,
  ProfileInitialState,
  ProfileListState,
  ProfileLoadingState,
  ProfileSetState,
  ProfileState,
} from "./state";
import { ProfileRepository } from "../../repositories";
import { Profile } from "../../models";

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

    if (event instanceof ProfileCreateEvent) {
      yield* this.create(event);
    } else if (event instanceof ProfileGetEvent) {
      yield* this.get(event);
    } else if (event instanceof ProfileSetEvent) {
      yield* this.set(event);
    } else if (event instanceof ProfileListEvent) {
      yield* this.list(event);
    }
  }

  async *create(event: ProfileCreateEvent) {
    try {
      await this.repository.set(event.profile);

      yield new ProfileCreateState();
    } catch (e) {
      yield new ProfileErrorState();
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

  async *set(event: ProfileSetEvent) {
    try {
      const originalProfile = await this.repository.get(event.id);
      const profile: Profile = {
        ...originalProfile,
        ...event.profile,
      };

      await this.repository.set(profile);

      yield new ProfileSetState(profile);
    } catch (e) {
      yield new ProfileErrorState();
    }
  }

  async *list(event: ProfileListEvent) {
    try {
      const profiles = await this.repository.list();

      yield new ProfileListState(profiles);
    } catch (e) {
      yield new ProfileErrorState();
    }
  }
}
