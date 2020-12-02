import { Profile } from "../../models";

export abstract class ProfileState {}

export class ProfileInitialState extends ProfileState {}

export class ProfileLoadingState extends ProfileState {}

export class ProfileErrorState extends ProfileState {}

export class ProfileGetState extends ProfileState {
  profile: Profile;

  constructor(profile: Profile) {
    super();

    this.profile = profile;
  }
}
