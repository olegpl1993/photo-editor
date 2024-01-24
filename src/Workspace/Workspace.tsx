import { useEffect, useRef } from "react";
import styles from "./Workspace.module.css";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import ZoomSlider from "./ZoomSlider/ZoomSlider";
import zoomState from "../store/zoomState";
import { observer } from "mobx-react-lite";

interface Props {
  image: HTMLImageElement | null;
  stageRef: React.RefObject<Konva.Stage>;
  isScaleOpen: boolean;
  imageScaleSize: { width: number; height: number };
}

const Workspace = observer((props: Props) => {
  const { image, stageRef, isScaleOpen, imageScaleSize } = props;

  const workspaceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    if (image && imageScaleSize.width > 0 && imageScaleSize.height > 0) {
      imageRef.current?.cache();
      imageRef.current?.getLayer()?.batchDraw();
    }
  }, [image, imageScaleSize, isScaleOpen]);

  useEffect(() => {
    if (workspaceRef.current) {
      const workspace = workspaceRef.current;
      workspace.scrollTop =
        workspace.scrollHeight / 2 - workspace.clientHeight / 2;
      workspace.scrollLeft =
        workspace.scrollWidth / 2 - workspace.clientWidth / 2;
    }
  }, [image, imageScaleSize, isScaleOpen]);

  if (!image) return null;
  return (
    <div className={styles.workspace} ref={workspaceRef}>
      <ZoomSlider isScaleOpen={isScaleOpen} />
      <div
        className={styles.wrapper}
        style={{
          width: isScaleOpen ? imageScaleSize.width * 1.6 : image.width * 1.6,
          height: isScaleOpen
            ? imageScaleSize.height * 1.6
            : image.height * 1.6,
        }}
      >
        <Stage
          width={isScaleOpen ? imageScaleSize.width : image.width}
          height={isScaleOpen ? imageScaleSize.height : image.height}
          ref={stageRef}
          style={{
            display: "block",
            position: "absolute",
            left: "50%",
            top: "50%",
            background: "white",
            minWidth: isScaleOpen ? imageScaleSize.width : image.width,
            minHeight: isScaleOpen ? imageScaleSize.height : image.height,
            transform: `translate(-50%, -50%) scale(${zoomState.zoom})`,
          }}
        >
          <Layer>
            <Image
              ref={imageRef}
              image={image}
              width={isScaleOpen ? imageScaleSize.width : image.width}
              height={isScaleOpen ? imageScaleSize.height : image.height}
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
