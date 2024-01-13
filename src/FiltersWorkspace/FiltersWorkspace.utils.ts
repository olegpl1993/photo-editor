export const updateCanvasSize = (image: HTMLImageElement) => {
  const desktopScale = 0.9;
  const mobileScale = 0.8;
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const imageWidth = image?.width;
  const imageHeight = image?.height;

  let newCanvasSize = { width: imageWidth, height: imageHeight };

  if (imageWidth > containerWidth || imageHeight > containerHeight) {
    const scalePercentage = containerWidth < 768 ? desktopScale : mobileScale;
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
