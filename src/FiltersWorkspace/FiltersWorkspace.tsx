import { useEffect, useRef } from "react";
import styles from "./FiltersWorkspace.module.css";
import { Filters } from "../types";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import { createFiltersArr } from "../App.utils";
import { updateCanvasSize } from "./FiltersWorkspace.utils";

interface Props {
  filters: Filters;
  image: HTMLImageElement | null;
  stageRef: React.RefObject<Konva.Stage>;
}

function FiltersWorkspace(props: Props) {
  console.log("filters workspace");
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
      imageRef.current?.contrast(filters.contrast);
      imageRef.current?.noise(filters.noise);
      imageRef.current?.pixelSize(filters.pixelate);
      imageRef.current?.levels(filters.posterize);
      imageRef.current?.threshold(filters.threshold);
    }
  }, [image, filters]);

  const canvasSize = updateCanvasSize(image!);

  if (!image) {
    return null;
  }

  return (
    <div className={styles.filtersWorkspace} ref={workspaceRef}>
      <div className={styles.wrapper}>
        <Stage
          width={canvasSize.width}
          height={canvasSize.height}
          ref={stageRef}
          style={{
            display: "block",
            position: "absolute",
            left: "50%",
            top: "50%",
            minWidth: canvasSize.width,
            minHeight: canvasSize.height,
            transform: `translate(-50%, -50%)`,
          }}
        >
          <Layer>
            <Image
              ref={imageRef}
              image={image!}
              width={canvasSize.width}
              height={canvasSize.height}
              x={0}
              y={0}
              imageSmoothingEnabled={false}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default FiltersWorkspace;
