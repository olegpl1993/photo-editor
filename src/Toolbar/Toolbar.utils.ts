import Konva from "konva";

export const saveCanvas = (
  file: File | null,
  stageRef: React.RefObject<Konva.Stage>
) => {
  if (stageRef.current) {
    const dataURL = stageRef.current.toDataURL({
      mimeType: "image/jpeg",
    });
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL || "";
    const fileName = file?.name.split(".")[0];
    downloadLink.download = fileName ? `${fileName}.jpg` : "photo-editor.jpg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
};

export const rotateImage = (
  direction: string,
  image: HTMLImageElement,
  setImgUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  const directionMap = {
    left: -90,
    right: 90,
    horizontal: 0,
    vertical: 0,
  };
  const angle = directionMap[direction as keyof typeof directionMap];
  const saveImageDiv = document.createElement("div");
  if (saveImageDiv && image) {
    const stage = new Konva.Stage({
      container: saveImageDiv,
      width:
        direction === "horizontal" || direction === "vertical"
          ? image.width
          : image.height,
      height:
        direction === "horizontal" || direction === "vertical"
          ? image.height
          : image.width,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const imageObj = new Konva.Image({
      image: image,
      x:
        direction === "right"
          ? image.height
          : direction === "horizontal"
          ? image.width
          : 0,
      y:
        direction === "left"
          ? image.width
          : direction === "vertical"
          ? image.height
          : 0,
      width: image.width,
      height: image.height,
      scaleX: direction === "horizontal" ? -1 : 1,
      scaleY: direction === "vertical" ? -1 : 1,
      imageSmoothingEnabled: false,
    });

    imageObj.rotate(angle);
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
