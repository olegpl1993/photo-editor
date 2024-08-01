import Konva from "konva";
import { Filter } from "konva/lib/Node";
import { Filters } from "../../shared/types";

export const createFiltersArr = (filters: Filters) => {
  const filtersArr: Filter[] = [];
  if (filters.blur) filtersArr.push(Konva.Filters.Blur);
  if (filters.brighten) filtersArr.push(Konva.Filters.Brighten);
  if (filters.contrast) filtersArr.push(Konva.Filters.Contrast);
  if (filters.grayscale) filtersArr.push(Konva.Filters.Grayscale);
  if (filters.invert) filtersArr.push(Konva.Filters.Invert);
  if (filters.noise) filtersArr.push(Konva.Filters.Noise);
  if (filters.pixelate > 1) filtersArr.push(Konva.Filters.Pixelate);
  if (filters.posterize) filtersArr.push(Konva.Filters.Posterize);
  if (filters.sepia) filtersArr.push(Konva.Filters.Sepia);
  if (filters.solarize) filtersArr.push(Konva.Filters.Solarize);
  if (filters.threshold) filtersArr.push(Konva.Filters.Threshold);
  if (filters.alpha) filtersArr.push(Konva.Filters.RGBA);
  if (filters.hue || filters.saturation || filters.luminance) {
    filtersArr.push(Konva.Filters.HSL);
  }
  return filtersArr;
};

export const updateFiltersImage = (
  image: HTMLImageElement,
  filters: Filters,
  setImgUrl: (imgUrl: string) => void
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
