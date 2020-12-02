import { Repository } from "./repository";
import { Profile } from "../models";

import profiles from "../../data/profiles/data.json";
import { RestaurantRepository } from "./restaurant";

const restaurantRepository = new RestaurantRepository();

export class ProfileRepository implements Repository<Profile> {
  async get(id: string): Promise<Profile> {
    const profileJson = profiles.find((item) => item.id === id);

    if (profileJson === undefined) {
      throw Error("Profile not found");
    }

    const restaurant = await restaurantRepository.get(
      profileJson.restaurant
    );

    return {
      id: profileJson.id,
      email: profileJson.email,
      firstName: profileJson.firstName,
      lastName: profileJson.lastName,
      restaurant,
    };
  }

  async set(profile: Profile): Promise<void> {
    const profileJson = {
      id: profile.id,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      restaurant: profile.restaurant.id,
    };
    const index = profiles.findIndex((item) => item.id === profile.id);

    if (index !== -1) {
      profiles[index] = profileJson;
    } else {
      profiles.push(profileJson);
    }
  }
}
