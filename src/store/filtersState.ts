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

  setFilter = (filter: keyof Filters, value: number) => {
    this.filters[filter] = value;
  };

  resetFilters = () => {
    Object.keys(this.filters).forEach((key) => {
      this.filters[key] = 0;
    });
    this.filters.pixelate = 1;
  };

  setFilterRGB = (r: number, g: number, b: number) => {
    this.filters.red = r;
    this.filters.green = g;
    this.filters.blue = b;
  };
}

export default new FiltersState();
