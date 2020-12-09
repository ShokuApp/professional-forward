import { Repository } from "./repository";
import { Profile } from "../models";

import profiles from "../../data/profiles/data.json";
import { RestaurantRepository } from "./restaurant";

const restaurantRepository = new RestaurantRepository();

// deepcode ignore no-any: JSON
async function fromJSON(profileJson: any): Promise<Profile> {
  const restaurant = await restaurantRepository.get(profileJson.restaurant);

  return {
    id: profileJson.id,
    email: profileJson.email,
    firstName: profileJson.firstName,
    lastName: profileJson.lastName,
    restaurant,
  };
}

function toJSON(profile: Profile) {
  return {
    id: profile.id,
    email: profile.email,
    firstName: profile.firstName,
    lastName: profile.lastName,
    restaurant: profile.restaurant.id,
  };
}

export class ProfileRepository implements Repository<Profile> {
  async get(id: string): Promise<Profile> {
    const profileJson = profiles.find((item) => item.id === id);

    if (profileJson === undefined) {
      throw Error("Profile not found");
    }

    return fromJSON(profileJson);
  }

  async set(profile: Profile): Promise<void> {
    const index = profiles.findIndex((item) => item.id === profile.id);
    const profileJson = toJSON(profile);

    if (index !== -1) {
      profiles[index] = profileJson;
    } else {
      profiles.push(profileJson);
    }
  }

  async list(): Promise<Profile[]> {
    return Promise.all(
      profiles.map((profileJson) => {
        return fromJSON(profileJson);
      })
    );
  }
}
