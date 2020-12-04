import { Repository } from "./repository";
import { Pictogram } from "../models";

import pictograms from "../../data/pictograms/data.json";

// deepcode ignore no-any: JSON
export class PictogramRepository implements Repository<Pictogram> {
  async get(id: string): Promise<Pictogram> {
    const pictogram = pictograms.find((item) => item.id === id);

    if (pictogram === undefined) {
      throw Error("Pictogram not found");
    }

    return pictogram;
  }

  async set(pictogram: Pictogram): Promise<void> {
    const index = pictograms.findIndex((item) => item.id === pictogram.id);

    if (index !== -1) {
      pictograms[index] = pictogram;
    } else {
      pictograms.push(pictogram);
    }
  }

  async list(): Promise<Pictogram[]> {
    return pictograms;
  }
}
