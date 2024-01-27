import { useEffect, useRef } from "react";
import styles from "./Workspace.module.css";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import ZoomSlider from "./ZoomSlider/ZoomSlider";
import { observer } from "mobx-react-lite";
import appState from "../store/appState";
import imageScaleState from "../store/imageScaleState";
import imageState from "../store/imageState";

interface Props {
  stageRef: React.RefObject<Konva.Stage>;
}

const Workspace = observer((props: Props) => {
  const { stageRef } = props;
  const { image } = imageState;
  const { imageScaleWidth, imageScaleHeight } = imageScaleState;
  const { isScaleOpen, zoom } = appState;

  const workspaceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    if (image && imageScaleWidth > 0 && imageScaleHeight > 0) {
      imageRef.current?.cache();
      imageRef.current?.getLayer()?.batchDraw();
    }
  }, [image, imageScaleWidth, imageScaleHeight, isScaleOpen]);

  useEffect(() => {
    if (workspaceRef.current) {
      const workspace = workspaceRef.current;
      workspace.scrollTop =
        workspace.scrollHeight / 2 - workspace.clientHeight / 2;
      workspace.scrollLeft =
        workspace.scrollWidth / 2 - workspace.clientWidth / 2;
    }
  }, [image, imageScaleWidth, imageScaleHeight, isScaleOpen]);

  if (!image) return null;
  return (
    <div className={styles.workspace} ref={workspaceRef}>
      <ZoomSlider isScaleOpen={isScaleOpen} />
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
        </Stage>
      </div>
    </div>
  );
});

export default Workspace;
