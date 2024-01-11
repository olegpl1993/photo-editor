import Konva from "konva";
import { Filters } from "../types";
import { createFiltersArr } from "../App.utils";

export const updateFiltersImage = (
  image: HTMLImageElement,
  filters: Filters,
  setImgUrl: React.Dispatch<React.SetStateAction<string>>,
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>
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

    const saveImage = stage.toDataURL({
      mimeType: "image/png",
    });

    setImgUrl(saveImage);
    setIsFiltersOpen(false);
    stage.destroy();
    layer.destroy();
    imageObj.destroy();
    URL.revokeObjectURL(saveImage);
  }
};
