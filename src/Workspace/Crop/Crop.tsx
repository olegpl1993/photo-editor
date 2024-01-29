import { useEffect, useRef, useState } from "react";
import { Layer, Rect, Transformer, Image } from "react-konva";
import Konva from "konva";
import { observer } from "mobx-react-lite";
import imageState from "../../store/imageState";
import { cropImage } from "./Crop.utils";
import { RectState } from "./Crop.types";
import appState from "../../store/appState";

const Crop = observer(() => {
  const { image, setImgUrl } = imageState;
  const { setCropActive, setLoadSpinner } = appState;

  const trRef = useRef<Konva.Transformer>(null);
  const rectRef = useRef<Konva.Rect>(null);
  if (rectRef.current) trRef.current?.nodes([rectRef.current]);

  const [rectState, setRectState] = useState<RectState>({
    x: image ? image.width / 2 - image.width / 4 : 0,
    y: image ? image.height / 2 - image.height / 4 : 0,
    width: image?.width || 0,
    height: image?.height || 0,
    scaleX: 0.5,
    scaleY: 0.5,
    fill: "rgba(103, 160, 210, 0.5)",
  });

  const scissorsRef = useRef<Konva.Image>(null);
  const scissorsObj = new window.Image();
  scissorsObj.src = "./scissors.png";
  const scissorsSize = 30;

  useEffect(() => {
    const currentRectWidth = rectState.width * rectState.scaleX;
    const currentRectHeight = rectState.height * rectState.scaleY;
    scissorsRef.current?.setAttrs({
      x: rectState.x + currentRectWidth / 2 - scissorsSize / 2,
      y: rectState.y + currentRectHeight / 2 - scissorsSize / 2,
    });
  }, [rectState]);

  const handleTransform = (event: Konva.KonvaEventObject<Event>) => {
    setRectState({
      ...rectState,
      scaleX: event.target.scaleX(),
      scaleY: event.target.scaleY(),
      x: event.target.x(),
      y: event.target.y(),
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
    const rect = rectRef.current;
    if (!rect || !image) return { x: 0, y: 0 };
    const height = rect.height() * rect.scaleY();
    const width = rect.width() * rect.scaleX();
    const newX = Math.max(0, Math.min(image.width - width, pos.x));
    const newY = Math.max(0, Math.min(image.height - height, pos.y));
    return { x: newX, y: newY };
  };

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
      <Transformer ref={trRef} rotateEnabled={false} />
      <Image
        x={rectState.width / 2 - scissorsSize / 2}
        y={rectState.height / 2 - scissorsSize / 2}
        ref={scissorsRef}
        image={scissorsObj}
        width={scissorsSize}
        height={scissorsSize}
        onClick={handleScissorsClick}
      />
    </Layer>
  );
});

export default Crop;
