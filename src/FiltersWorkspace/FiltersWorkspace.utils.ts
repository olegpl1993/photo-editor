export const updateCanvasSize = (image: HTMLImageElement) => {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const imageWidth = image?.width;
  const imageHeight = image?.height;

  let newCanvasSize = { width: imageWidth, height: imageHeight };

  const scalePercentage = containerWidth < 768 ? 0.9 : 0.6;
  newCanvasSize.width *= scalePercentage;
  newCanvasSize.height *= scalePercentage;

  if (imageWidth > containerWidth || imageHeight > containerHeight) {
    const containerRatio = containerWidth / containerHeight;
    const imageRatio = imageWidth / imageHeight;

    if (imageRatio > containerRatio) {
      newCanvasSize = {
        width: containerWidth * scalePercentage,
        height: (containerWidth * scalePercentage) / imageRatio,
      };
    } else {
      newCanvasSize = {
        width: containerHeight * scalePercentage * imageRatio,
        height: containerHeight * scalePercentage,
      };
    }
  }

  return newCanvasSize;
};
