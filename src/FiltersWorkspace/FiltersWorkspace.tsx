import { useEffect, useRef } from "react";
import styles from "./FiltersWorkspace.module.css";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import { createFiltersArr } from "../App.utils";
import { updateCanvasSize } from "./FiltersWorkspace.utils";
import filtersState from "../store/filtersState";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

interface Props {
  image: HTMLImageElement | null;
  stageRef: React.RefObject<Konva.Stage>;
}

const FiltersWorkspace = observer((props: Props) => {
  const { image, stageRef } = props;
  const filters = toJS(filtersState.filters);

  const workspaceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    if (image) {
      const filtersArr = createFiltersArr(filters);
      imageRef.current?.cache();
      imageRef.current?.getLayer()?.batchDraw();
      imageRef.current?.filters(filtersArr);
      imageRef.current?.blurRadius(filters.blur);
      imageRef.current?.brightness(filters.brighten);
      imageRef.current?.contrast(filters.contrast);
      imageRef.current?.noise(filters.noise);
      imageRef.current?.pixelSize(filters.pixelate);
      imageRef.current?.levels(filters.posterize);
      imageRef.current?.threshold(filters.threshold);
      imageRef.current?.red(filters.red);
      imageRef.current?.green(filters.green);
      imageRef.current?.blue(filters.blue);
      imageRef.current?.alpha(filters.alpha);
      imageRef.current?.hue(filters.hue);
      imageRef.current?.saturation(filters.saturation);
      imageRef.current?.luminance(filters.luminance);
    }
  }, [image, filters]);

  if (!image) {
    return null;
  }

  const canvasSize = updateCanvasSize(image);

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
