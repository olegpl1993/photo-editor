import Konva from "konva";
import { Filters } from "../types";
import { createFiltersArr } from "../App.utils";

export const updateFiltersImage = (
  image: HTMLImageElement,
  filters: Filters,
  setImgUrl: React.Dispatch<React.SetStateAction<string>>,
) => {
  const saveImageDiv = document.createElement("div");
  if (saveImageDiv && image) {
    const stage = new Konva.Stage({
      container: saveImageDiv,
      width: image.width,
      height: image.height,
    });
    const layer = new Konva.Layer();
    stage.add(layer);

    const imageObj = new Konva.Image({
      x: 0,
      y: 0,
      image: image,
      width: image.width,
      height: image.height,
      filters: createFiltersArr(filters),
      imageSmoothingEnabled: false,
    });
    layer.add(imageObj);

    imageObj.cache();
    imageObj.blurRadius(filters.blur);
    imageObj.brightness(filters.brighten);
    imageObj.contrast(filters.contrast);
    imageObj.noise(filters.noise);
    imageObj.pixelSize(filters.pixelate);
    imageObj.levels(filters.posterize);
    imageObj.threshold(filters.threshold);
    imageObj.red(filters.red);
    imageObj.green(filters.green);
    imageObj.blue(filters.blue);
    imageObj.alpha(filters.alpha);
    imageObj.hue(filters.hue);
    imageObj.saturation(filters.saturation);
    imageObj.luminance(filters.luminance);

    const saveImage = stage.toDataURL({
      mimeType: "image/png",
    });

    setImgUrl(saveImage);
    stage.destroy();
    layer.destroy();
    imageObj.destroy();
    URL.revokeObjectURL(saveImage);
  }
};

export const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, "");
  const bigint = parseInt(hex, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;
  return { r: red, g: green, b: blue };
};

export const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
