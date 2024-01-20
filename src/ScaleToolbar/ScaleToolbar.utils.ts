import Konva from "konva";

export const imageNewSize = (
  imageScaleSize: { width: number; height: number } | null,
  image: HTMLImageElement,
  setImgUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  const saveImageDiv = document.createElement("div");
  if (saveImageDiv) {
    const stage = new Konva.Stage({
      container: saveImageDiv,
      width: imageScaleSize?.width,
      height: imageScaleSize?.height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const imageObj = new Konva.Image({
      image: image,
      x: 0,
      y: 0,
      width: imageScaleSize?.width,
      height: imageScaleSize?.height,
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
