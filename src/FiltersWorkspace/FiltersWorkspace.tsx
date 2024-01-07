import { useEffect, useRef } from "react";
import styles from "./FiltersWorkspace.module.css";
import { Filters } from "../types";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import { createFiltersArr } from "../services";

interface Props {
  filters: Filters;
  image: HTMLImageElement | null;
  stageRef: React.RefObject<Konva.Stage>;
}

const updateCanvasSize = (image: HTMLImageElement) => {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const imageWidth = image?.width;
  const imageHeight = image?.height;

  let newCanvasSize = { width: imageWidth, height: imageHeight };

  const scalePercentage = containerWidth < 768 ? 0.9 : 0.6;
  newCanvasSize.width *= scalePercentage;
  newCanvasSize.height *= scalePercentage;

  if (imageWidth > containerWidth || imageHeight > containerHeight) {
    const containerRatio = containerWidth / containerHeight;
    const imageRatio = imageWidth / imageHeight;

    if (imageRatio > containerRatio) {
      newCanvasSize = {
        width: containerWidth * scalePercentage,
        height: (containerWidth * scalePercentage) / imageRatio,
      };
    } else {
      newCanvasSize = {
        width: containerHeight * scalePercentage * imageRatio,
        height: containerHeight * scalePercentage,
      };
    }
  }

  return newCanvasSize;
};

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
    }
  }, [image, filters]);

  const canvasSize = updateCanvasSize(image!);

  if (!image) {
    return null;
  }

  return (
    <div className={styles.workspace} ref={workspaceRef}>
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
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default FiltersWorkspace;
