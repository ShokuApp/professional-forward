import { Profile } from "../../models";

export abstract class ProfileEvent {}

export class ProfileCreateEvent extends ProfileEvent {
  profile: Profile;

  constructor(profile: Profile) {
    super();

    this.profile = profile;
  }
}

export class ProfileGetEvent extends ProfileEvent {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}

export class ProfileSetEvent extends ProfileEvent {
  id: string;
  profile: Partial<Profile>;

  constructor(id: string, profile: Partial<Profile>) {
    super();

    this.id = id;
    this.profile = profile;
  }
}

export class ProfileListEvent extends ProfileEvent {}
