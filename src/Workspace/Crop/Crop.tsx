import Konva from "konva";
import { Box } from "konva/lib/shapes/Transformer";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Image, Layer, Rect, Transformer } from "react-konva";
import appState from "../../store/appState";
import imageState from "../../store/imageState";
import { RectState } from "./Crop.types";
import { cropImage } from "./Crop.utils";

const Crop = observer(() => {
  const { image, setImgUrl } = imageState;
  const { setCropActive, setLoadSpinner, zoom } = appState;

  const baseAnchorSize = 13;
  const currentAnchorSize = baseAnchorSize / zoom;
  const baseScissorsSize = 30;
  const currentScissorsSize = baseScissorsSize / zoom;

  const trRef = useRef<Konva.Transformer>(null);
  const rectRef = useRef<Konva.Rect>(null);
  if (rectRef.current) trRef.current?.nodes([rectRef.current]);

  const scissorsRef = useRef<Konva.Image>(null);
  const scissorsObj = new window.Image();
  scissorsObj.src = "./scissors.png";

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
    scissorsRef.current?.setAttrs({
      x: rectState.x + currentRectWidth / 2 - currentScissorsSize / 2,
      y: rectState.y + currentRectHeight / 2 - currentScissorsSize / 2,
    });
  }, [currentScissorsSize, rectState]);

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

  const handleScissorsClick = async () => {
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
      />
      <Transformer
        ref={trRef}
        rotateEnabled={false}
        anchorSize={currentAnchorSize}
        boundBoxFunc={boundBoxFunc}
      />
      <Image
        x={rectState.width / 2 - currentScissorsSize / 2}
        y={rectState.height / 2 - currentScissorsSize / 2}
        ref={scissorsRef}
        image={scissorsObj}
        width={currentScissorsSize}
        height={currentScissorsSize}
        onClick={handleScissorsClick}
        onTap={handleScissorsClick}
      />
    </Layer>
  );
});

export default Crop;
