import Konva from "konva";
import { RectState } from "./Crop.types";

export const cropImage = (
  rectState: RectState,
  image: HTMLImageElement,
  setImgUrl: (imgUrl: string) => void
) => {
  const x = rectState.x;
  const y = rectState.y;
  const width = rectState.width * rectState.scaleX;
  const height = rectState.height * rectState.scaleY;

  const saveImageDiv = document.createElement("div");
  if (saveImageDiv) {
    const stage = new Konva.Stage({
      container: saveImageDiv,
      width,
      height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const imageObj = new Konva.Image({
      image: image,
      width,
      height,
      crop: { x, y, width, height },
      imageSmoothingEnabled: false,
    });

    layer.add(imageObj);

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
