import { makeAutoObservable } from "mobx";

class appState {
  isLoadSpinner = false;
  isScaleOpen = false;
  isFiltersOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoadSpinner = (loadSpinner: boolean) => {
    this.isLoadSpinner = loadSpinner;
  };

  setScaleOpen = (scaleOpen: boolean) => {
    this.isScaleOpen = scaleOpen;
  };

  setFiltersOpen = (filtersOpen: boolean) => {
    this.isFiltersOpen = filtersOpen;
  };
}

export default new appState();
