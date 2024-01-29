import { makeAutoObservable } from "mobx";

class AppState {
  isLoadSpinner = false;
  isScaleOpen = false;
  isFiltersOpen = false;
  isCropActive = false;
  zoom = 1;

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

  setCropActive = (cropActive: boolean) => {
    this.isCropActive = cropActive;
  };

  setZoom = (zoom: number) => {
    this.zoom = zoom;
  };
}

export default new AppState();
