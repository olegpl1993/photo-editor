import { makeAutoObservable } from "mobx";

class ImageScaleState {
  imageScaleWidth = 1;
  imageScaleHeight = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setImageScaleSize = (newWidth: number, newHeight: number) => {
    this.imageScaleWidth = newWidth;
    this.imageScaleHeight = newHeight;
  };
}

export default new ImageScaleState();
