import { makeAutoObservable } from "mobx";

class ZoomState {
  zoom = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setZoom = (zoom: number) => {
    this.zoom = zoom;
  };
}

export default new ZoomState();
