import { makeAutoObservable } from "mobx";

class ImageState {
  file: File | null = null;
  imgUrl: string = "";
  image: HTMLImageElement | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFile = (file: File | null) => {
    this.file = file;
  };

  setImgUrl = (imgUrl: string) => {
    this.imgUrl = imgUrl;
  };

  setImage = (image: HTMLImageElement | null) => {
    this.image = image;
  };
}

export default new ImageState();
