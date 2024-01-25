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
import { observer } from "mobx-react-lite";
import appState from "./store/appState";
import imageScaleState from "./store/imageScaleState";

const App = observer(() => {
  const { isLoadSpinner, isScaleOpen, isFiltersOpen, setZoom } = appState;
  const { setImageScaleSize } = imageScaleState;
  const stageRef = useRef<Konva.Stage>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      setZoom(1);
    }
  }, [file, setZoom]);

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      setImage(img);
    };
  }, [imgUrl]);

  useEffect(() => {
    if (image) {
      setImageScaleSize(image.width, image.height);
    }
  }, [image, setImageScaleSize]);

  if (image && isScaleOpen) {
    return (
      <div className={styles.app}>
        <ScaleToolbar image={image} setImgUrl={setImgUrl} />
        <Workspace image={image} stageRef={stageRef} />
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
        <Workspace image={image} stageRef={stageRef} />
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
