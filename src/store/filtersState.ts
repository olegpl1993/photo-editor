import { makeAutoObservable } from "mobx";
import { Filters } from "../types";

class FiltersState {
  filters: Filters = {
    blur: 0,
    brighten: 0,
    contrast: 0,
    grayscale: 0,
    invert: 0,
    noise: 0,
    pixelate: 1,
    posterize: 0,
    sepia: 0,
    solarize: 0,
    threshold: 0,
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
    hue: 0,
    saturation: 0,
    luminance: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setFilters = (newFilters: Filters) => {
    this.filters = newFilters;
  };

  setFilter = (filter: keyof Filters, value: number) => {
    this.filters[filter] = value;
  };
}

export default new FiltersState();
