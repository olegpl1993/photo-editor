import Konva from "konva";
import { Filters } from "../types";

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
      filters: [Konva.Filters.Blur, Konva.Filters.Brighten],
    });
    layer.add(imageObj);

    imageObj.cache();
    imageObj.blurRadius(filters.blur);
    imageObj.brightness(filters.brighten);

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
