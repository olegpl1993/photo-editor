import Konva from "konva";
import { Box } from "konva/lib/shapes/Transformer";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Image, Layer, Rect, Text, Transformer } from "react-konva";
import appState from "../../store/appState";
import imageState from "../../store/imageState";
import { RectState } from "./Crop.types";
import { cropImage } from "./Crop.utils";

const Crop = observer(() => {
  const { image, setImgUrl } = imageState;
  const { setCropActive, setLoadSpinner, zoom } = appState;

  const borderStrokeWidth = 2;
  const anchorRadius = 6;
  const anchorSize = 20;
  const fontSize = 12;
  const cropBtnSize = 30;
  const currentCropBtnSize = cropBtnSize / zoom;

  const trRef = useRef<Konva.Transformer>(null);
  const rectRef = useRef<Konva.Rect>(null);
  if (rectRef.current) trRef.current?.nodes([rectRef.current]);

  const cropBtnRef = useRef<Konva.Image>(null);
  const cropBtnObj = new window.Image();
  cropBtnObj.src = "./crop-img.png";

  const [rectState, setRectState] = useState<RectState>({
    x: image ? image.width / 2 - image.width / 4 : 0,
    y: image ? image.height / 2 - image.height / 4 : 0,
    width: image?.width || 0,
    height: image?.height || 0,
    scaleX: 0.5,
    scaleY: 0.5,
    fill: "rgba(103, 160, 210, 0.5)",
  });

  useEffect(() => {
    const currentRectWidth = rectState.width * rectState.scaleX;
    const currentRectHeight = rectState.height * rectState.scaleY;
    cropBtnRef.current?.setAttrs({
      x: rectState.x + currentRectWidth / 2 - currentCropBtnSize / 2,
      y: rectState.y + currentRectHeight / 2 - currentCropBtnSize / 2,
    });
  }, [currentCropBtnSize, rectState]);

  const handleTransform = (event: Konva.KonvaEventObject<Event>) => {
    const rect = rectRef.current;
    if (!rect || !image) return;
    const scaleX = event.target.scaleX();
    const scaleY = event.target.scaleY();
    const width = rect.width() * scaleX;
    const height = rect.height() * scaleY;
    const x = event.target.x();
    const y = event.target.y();
    const newX = Math.max(0, Math.min(image.width - width, x));
    const newY = Math.max(0, Math.min(image.height - height, y));

    setRectState({
      ...rectState,
      x: newX,
      y: newY,
      scaleX: scaleX,
      scaleY: scaleY,
    });
  };

  const handleDragMove = (event: Konva.KonvaEventObject<Event>) => {
    setRectState({
      ...rectState,
      x: event.target.x(),
      y: event.target.y(),
    });
  };

  const dragBound = (pos: { x: number; y: number }) => {
    const height = rectState.height * rectState.scaleY;
    const width = rectState.width * rectState.scaleX;
    const newX = Math.max(0, Math.min(rectState.width - width, pos.x));
    const newY = Math.max(0, Math.min(rectState.height - height, pos.y));
    return { x: newX, y: newY };
  };

  const boundBoxFunc = (oldBox: Box, newBox: Box): Box =>
    newBox.width < 50 ||
    newBox.height < 50 ||
    newBox.rotation !== 0 ||
    newBox.x < 0 ||
    newBox.y < 0 ||
    newBox.x + newBox.width > rectState.width ||
    newBox.y + newBox.height > rectState.height
      ? oldBox
      : newBox;

  const handleCropBtnClick = async () => {
    if (!image) return;
    setLoadSpinner(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        cropImage(rectState, image, setImgUrl);
        resolve();
      }, 10);
    });
    setCropActive(false);
    setLoadSpinner(false);
  };

  return (
    <Layer>
      <Rect
        {...rectState}
        ref={rectRef}
        draggable={true}
        onDragMove={handleDragMove}
        onTransform={handleTransform}
        dragBoundFunc={dragBound}
        onMouseOver={() => {
          document.body.style.cursor = "grab";
        }}
        onMouseOut={() => {
          document.body.style.cursor = "default";
        }}
      />
      <Transformer
        ref={trRef}
        rotateEnabled={false}
        anchorSize={anchorSize / zoom}
        anchorCornerRadius={anchorRadius / zoom}
        boundBoxFunc={boundBoxFunc}
        borderStrokeWidth={borderStrokeWidth / zoom}
        anchorStrokeWidth={borderStrokeWidth / zoom}
      />
      <Text
        x={rectState.x + 5}
        y={rectState.y + 5}
        text={`W: ${Math.round(rectState.width * rectState.scaleX)}`}
        fontSize={fontSize / zoom}
        fill="#ffffff"
        align="center"
      />
      <Text
        x={rectState.x + 5}
        y={rectState.y + 5 + fontSize / zoom}
        text={`H:  ${Math.round(rectState.height * rectState.scaleY)}`}
        fontSize={fontSize / zoom}
        fill="#ffffff"
        align="center"
      />
      <Image
        x={rectState.width / 2 - currentCropBtnSize / 2}
        y={rectState.height / 2 - currentCropBtnSize / 2}
        ref={cropBtnRef}
        image={cropBtnObj}
        width={currentCropBtnSize}
        height={currentCropBtnSize}
        onClick={handleCropBtnClick}
        onTap={handleCropBtnClick}
        onMouseOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onMouseOut={() => {
          document.body.style.cursor = "default";
        }}
      />
    </Layer>
  );
});

export default Crop;
