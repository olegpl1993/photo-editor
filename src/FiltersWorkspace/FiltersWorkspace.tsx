import { useEffect, useRef } from "react";
import styles from "./FiltersWorkspace.module.css";
import { Filters } from "../types";
import { Stage, Layer, Rect, Image } from "react-konva";
import Konva from "konva";
import { Filter } from "konva/lib/Node";

interface Props {
  filters: Filters;
  image: HTMLImageElement | null;
  stageRef: React.RefObject<Konva.Stage>;
}

function createFiltersArr(filters: Filters) {
  const filtersArr: Filter[] = [];
  if (filters.blur) filtersArr.push(Konva.Filters.Blur);
  if (filters.brighten) filtersArr.push(Konva.Filters.Brighten);
  return filtersArr;
}

function FiltersWorkspace(props: Props) {
  console.log("workspace");
  const { filters, image, stageRef } = props;

  const workspaceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    if (image) {
      imageRef.current?.cache();
      imageRef.current?.getLayer()?.batchDraw();
      const filtersArr = createFiltersArr(filters);
      imageRef.current?.filters(filtersArr);
      imageRef.current?.blurRadius(filters.blur);
      imageRef.current?.brightness(filters.brighten);
    }
  }, [image, filters]);

  useEffect(() => {
    if (workspaceRef.current) {
      const workspace = workspaceRef.current;
      workspace.scrollTop =
        workspace.scrollHeight / 2 - workspace.clientHeight / 2;
      workspace.scrollLeft =
        workspace.scrollWidth / 2 - workspace.clientWidth / 2;
    }
  }, []);

  if (!image) {
    return null;
  }

  return (
    <div className={styles.workspace} ref={workspaceRef}>
      <div className={styles.wrapper} style={{ border: "1px solid red" }}>
        <Stage
          width={800}
          height={600}
          ref={stageRef}
          style={{
            border: "1px solid green",
            display: "block",
            position: "absolute",
            left: "50%",
            top: "50%",
            minWidth: 800,
            minHeight: 600,
            transform: `translate(-50%, -50%)`,
          }}
        >
          <Layer>
            <Image
              ref={imageRef}
              image={image!}
              width={800}
              height={600}
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

export default FiltersWorkspace;
