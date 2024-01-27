import { useEffect, useRef } from "react";
import styles from "./App.module.css";
import Toolbar from "./Toolbar/Toolbar";
import Workspace from "./Workspace/Workspace";
import Konva from "konva";
import FiltersWorkspace from "./FiltersWorkspace/FiltersWorkspace";
import FiltersToolbar from "./FiltersToolbar/FiltersToolbar";
import { loadImg } from "./App.utils";
import Spinner from "./Spinner/Spinner";
import ScaleToolbar from "./ScaleToolbar/ScaleToolbar";
import { observer } from "mobx-react-lite";
import appState from "./store/appState";
import imageScaleState from "./store/imageScaleState";
import imageState from "./store/imageState";

const App = observer(() => {
  const { isLoadSpinner, isScaleOpen, isFiltersOpen, setZoom, setLoadSpinner } = appState;
  const { setImageScaleSize } = imageScaleState;
  const { file, setFile, imgUrl, setImgUrl, image, setImage } = imageState;
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      setZoom(1);
    }
  }, [file, setImgUrl, setZoom]);

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      setImage(img);
    };
  }, [imgUrl, setImage]);

  useEffect(() => {
    if (image) {
      setImageScaleSize(image.width, image.height);
    }
  }, [image, setImageScaleSize]);

  if (image && isScaleOpen) {
    return (
      <div className={styles.app}>
        <ScaleToolbar />
        <Workspace stageRef={stageRef} />
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
        <FiltersToolbar />
        <FiltersWorkspace stageRef={stageRef} />
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
        <Toolbar stageRef={stageRef} />
        <Workspace stageRef={stageRef} />
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
      <button onClick={() => loadImg(setFile, setLoadSpinner)} className={styles.loadPhotoBtn}>
        LOAD PHOTO
      </button>
    </div>
  );
});

export default App;
