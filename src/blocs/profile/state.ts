import { Profile } from "../../models";

export abstract class ProfileState {}

export class ProfileInitialState extends ProfileState {}

export class ProfileLoadingState extends ProfileState {}

export class ProfileErrorState extends ProfileState {}

export class ProfileCreateState extends ProfileState {}

export class ProfileGetState extends ProfileState {
  profile: Profile;

  constructor(profile: Profile) {
    super();
    this.profile = profile;
  }
}

export class ProfileSetState extends ProfileState {
  profile: Profile;

  constructor(profile: Profile) {
    super();

    this.profile = profile;
  }
}

export class ProfileListState extends ProfileState {
  profiles: Profile[];

  constructor(profiles: Profile[]) {
    super();
    this.profiles = profiles;
  }
}
