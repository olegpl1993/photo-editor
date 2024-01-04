import { useEffect, useRef } from "react";
import styles from "./Workspace.module.css";
import { Filters } from "../types";
import { Stage, Layer, Rect, Image } from "react-konva";
import Konva from "konva";
import useImage from "use-image";

interface Props {
  filters: Filters;
  imgUrl: string | null;
  stageRef: React.RefObject<Konva.Stage>;
  scale: number;
}

function Workspace(props: Props) {
  console.log("workspace");
  const { filters, imgUrl, stageRef, scale } = props;
  const imageRef = useRef<Konva.Image>(null);
  const [image] = useImage(imgUrl || "/dragon.jpg", "anonymous");

  useEffect(() => {
    if (image) {
      imageRef.current?.cache();
      imageRef.current?.getLayer()?.batchDraw();
      imageRef.current?.blurRadius(filters.blur);
    }
  }, [image, filters]);

  if (!image) {
    return null;
  }

  return (
    <div className={styles.workspace}>
      <div className={styles.wrapper}>
        <Stage
          width={image.width}
          height={image.height}
          ref={stageRef}
          style={{
            border: "3px solid red",
            display: "block",
            position: "absolute",
            left: "50%",
            top: "50%",
            backgroundColor: "",
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
              filters={[Konva.Filters.Blur]}
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

export default Workspace;
