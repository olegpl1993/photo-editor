import { makeAutoObservable } from "mobx";

class ImageScaleState {
  imageScaleWidth = 1;
  imageScaleHeight = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setImageScaleSize = (imageWidth: number, imageHeight: number) => {
    this.imageScaleWidth = imageWidth;
    this.imageScaleHeight = imageHeight;
  };

  setImageScaleSizeByParam = (changeParam: string, value: number) => {
    if (changeParam === "width") this.imageScaleWidth = value;
    if (changeParam === "height") this.imageScaleHeight = value;
  };

  setImageScaleSizeSaveRatio = (
    changeParam: string,
    value: number,
    width: number,
    height: number
  ) => {
    const aspectRatio =
      changeParam === "width" ? height / width : width / height;
    this.imageScaleWidth =
      changeParam === "width" ? value : Math.round(value * aspectRatio);
    this.imageScaleHeight =
      changeParam === "height" ? value : Math.round(value * aspectRatio);
  };
}

export default new ImageScaleState();
