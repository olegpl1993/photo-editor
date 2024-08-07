import Konva from "konva";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Image, Layer, Stage } from "react-konva";
import appState from "../../app/store/appState";
import imageScaleState from "../../app/store/imageScaleState";
import imageState from "../../app/store/imageState";
import Crop from "../../shared/Crop/Crop";
import ZoomSlider from "../../shared/ZoomSlider/ZoomSlider";
import Scroller from "./Scroller/Scroller";
import styles from "./Workspace.module.css";

interface Props {
  stageRef: React.RefObject<Konva.Stage>;
}

const Workspace = observer((props: Props) => {
  const { stageRef } = props;
  const { image } = imageState;
  const { imageScaleWidth, imageScaleHeight } = imageScaleState;
  const { isScaleOpen, zoom, isCropActive } = appState;

  const workspaceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    workspace.scrollTop =
      workspace.scrollHeight / 2 - workspace.clientHeight / 2;
    workspace.scrollLeft =
      workspace.scrollWidth / 2 - workspace.clientWidth / 2;
  }, [image, imageScaleWidth, imageScaleHeight, isScaleOpen, isCropActive]);

  if (!image) return;
  return (
    <div className={styles.workspace} ref={workspaceRef}>
      <ZoomSlider />
      <div
        className={styles.wrapper}
        style={{
          width: isScaleOpen ? imageScaleWidth * 1.6 : image.width * 1.6,
          height: isScaleOpen ? imageScaleHeight * 1.6 : image.height * 1.6,
        }}
      >
        <Stage
          width={isScaleOpen ? imageScaleWidth : image.width}
          height={isScaleOpen ? imageScaleHeight : image.height}
          ref={stageRef}
          style={{
            display: "block",
            position: "absolute",
            left: "50%",
            top: "50%",
            background: "white",
            minWidth: isScaleOpen ? imageScaleWidth : image.width,
            minHeight: isScaleOpen ? imageScaleHeight : image.height,
            transform: `translate(-50%, -50%) scale(${zoom})`,
          }}
        >
          <Layer>
            <Image
              ref={imageRef}
              image={image}
              width={isScaleOpen ? imageScaleWidth : image.width}
              height={isScaleOpen ? imageScaleHeight : image.height}
              x={0}
              y={0}
              imageSmoothingEnabled={false}
            />
          </Layer>

          {isCropActive && <Crop />}
        </Stage>
        <Scroller workspaceRef={workspaceRef} />
      </div>
    </div>
  );
});

export default Workspace;
