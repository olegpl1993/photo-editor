import Konva from "konva";

export const imageNewSize = (
  width: number,
  height: number,
  image: HTMLImageElement,
  setImgUrl: (imgUrl: string) => void
) => {
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
      x: 0,
      y: 0,
      width,
      height,
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
