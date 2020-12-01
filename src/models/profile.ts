import { Restaurant } from "./restaurant";

export type Profile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  restaurant: Restaurant;
};
