import { useEffect, useRef, useState } from "react";
import styles from "./Workspace.module.css";
import { Stage, Layer, Rect, Image } from "react-konva";
import Konva from "konva";
import ScaleSlider from "./ScaleSlider/ScaleSlider";

interface Props {
  image: HTMLImageElement | null;
  stageRef: React.RefObject<Konva.Stage>;
}

function Workspace(props: Props) {
  console.log("workspace");
  const { image, stageRef } = props;

  const workspaceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<Konva.Image>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (image) {
      imageRef.current?.cache();
      imageRef.current?.getLayer()?.batchDraw();
    }
  }, [image]);

  useEffect(() => {
    if (workspaceRef.current) {
      const workspace = workspaceRef.current;
      workspace.scrollTop =
        workspace.scrollHeight / 2 - workspace.clientHeight / 2;
      workspace.scrollLeft =
        workspace.scrollWidth / 2 - workspace.clientWidth / 2;
    }
  }, [image]);

  if (image) {
    return (
      <div className={styles.workspace} ref={workspaceRef}>
        <ScaleSlider setScale={setScale} />
        <div
          className={styles.wrapper}
          style={{
            minWidth: image.width * 1.6,
            minHeight: image.height * 1.6,
          }}
        >
          <Stage
            width={image.width}
            height={image.height}
            ref={stageRef}
            style={{
              display: "block",
              position: "absolute",
              left: "50%",
              top: "50%",
              background: "white",
              minWidth: image.width,
              minHeight: image.height,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          >
            <Layer>
              <Image
                ref={imageRef}
                image={image!}
                width={image.width}
                height={image.height}
                x={0}
                y={0}
              />

              <Rect width={100} height={100} fill="blue" draggable />

              <Rect
                width={100}
                height={100}
                fill="red"
                x={200}
                y={200}
                draggable
              />
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

export default Workspace;
