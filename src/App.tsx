import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import Toolbar from "./Toolbar/Toolbar";
import Workspace from "./Workspace/Workspace";
import Konva from "konva";
import FiltersWorkspace from "./FiltersWorkspace/FiltersWorkspace";
import FiltersToolbar from "./FiltersToolbar/FiltersToolbar";
import { loadImg } from "./App.utils";
import Spinner from "./Spinner/Spinner";
import ScaleToolbar from "./ScaleToolbar/ScaleToolbar";
import zoomState from "./store/zoomState";
import { observer } from "mobx-react-lite";
import appState from "./store/appState";

const App = observer(() => {
  const { isLoadSpinner, isScaleOpen, isFiltersOpen } = appState;
  const stageRef = useRef<Konva.Stage>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const [imageScaleSize, setImageScaleSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      zoomState.setZoom(1);
    }
  }, [file]);

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      setImage(img);
    };
  }, [imgUrl]);

  useEffect(() => {
    if (image) {
      setImageScaleSize({ width: image.width, height: image.height });
    }
  }, [image]);

  if (image && isScaleOpen) {
    return (
      <div className={styles.app}>
        <ScaleToolbar
          image={image}
          imageScaleSize={imageScaleSize}
          setImageScaleSize={setImageScaleSize}
          setImgUrl={setImgUrl}
        />
        <Workspace
          image={image}
          stageRef={stageRef}
          imageScaleSize={imageScaleSize}
        />
        {isLoadSpinner && (
          <div className={styles.spinnerWrapper}>
            <Spinner />
          </div>
        )}
      </div>
    );
  }

  if (image && isFiltersOpen) {
    return (
      <div className={styles.app}>
        <FiltersToolbar image={image} setImgUrl={setImgUrl} />
        <FiltersWorkspace image={image} stageRef={stageRef} />
        {isLoadSpinner && (
          <div className={styles.spinnerWrapper}>
            <Spinner />
          </div>
        )}
      </div>
    );
  }

  if (image) {
    return (
      <div className={styles.app}>
        <Toolbar
          file={file}
          stageRef={stageRef}
          setFile={setFile}
          image={image}
          setImgUrl={setImgUrl}
        />
        <Workspace
          image={image}
          stageRef={stageRef}
          imageScaleSize={imageScaleSize}
        />
        {isLoadSpinner && (
          <div className={styles.spinnerWrapper}>
            <Spinner />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.loadPhotoWrapper}>
      <button onClick={() => loadImg(setFile)} className={styles.loadPhotoBtn}>
        LOAD PHOTO
      </button>
    </div>
  );
});

export default App;
