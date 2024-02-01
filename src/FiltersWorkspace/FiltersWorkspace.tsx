import { useEffect, useRef } from "react";
import styles from "./FiltersWorkspace.module.css";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import { updateCanvasSize } from "./FiltersWorkspace.utils";
import filtersState from "../store/filtersState";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import imageState from "../store/imageState";
import { createFiltersArr } from "../FiltersToolbar/FiltersToolbar.utils";

interface Props {
  stageRef: React.RefObject<Konva.Stage>;
}

const FiltersWorkspace = observer((props: Props) => {
  const { stageRef } = props;
  const { image } = imageState;
  const filters = toJS(filtersState.filters);

  const workspaceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<Konva.Image>(null);
  const canvasSize = updateCanvasSize(image);

  useEffect(() => {
    const imageRefCurrent = imageRef.current;
    if (!image || !imageRefCurrent) return;
    const filtersArr = createFiltersArr(filters);
    imageRefCurrent.cache();
    imageRefCurrent.getLayer()?.batchDraw();
    imageRefCurrent.filters(filtersArr);
    imageRefCurrent.blurRadius(filters.blur);
    imageRefCurrent.brightness(filters.brighten);
    imageRefCurrent.contrast(filters.contrast);
    imageRefCurrent.noise(filters.noise);
    imageRefCurrent.pixelSize(filters.pixelate);
    imageRefCurrent.levels(filters.posterize);
    imageRefCurrent.threshold(filters.threshold);
    imageRefCurrent.red(filters.red);
    imageRefCurrent.green(filters.green);
    imageRefCurrent.blue(filters.blue);
    imageRefCurrent.alpha(filters.alpha);
    imageRefCurrent.hue(filters.hue);
    imageRefCurrent.saturation(filters.saturation);
    imageRefCurrent.luminance(filters.luminance);
  }, [image, filters]);

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
});

export default FiltersWorkspace;
