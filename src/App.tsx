import Konva from "konva";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import styles from "./App.module.css";
import FiltersToolbar from "./FiltersToolbar/FiltersToolbar";
import FiltersWorkspace from "./FiltersWorkspace/FiltersWorkspace";
import LoadImageScreen from "./LoadImageScreen/LoadImageScreen";
import ScaleToolbar from "./ScaleToolbar/ScaleToolbar";
import Spinner from "./Spinner/Spinner";
import Toolbar from "./Toolbar/Toolbar";
import Workspace from "./Workspace/Workspace";
import appState from "./store/appState";
import imageScaleState from "./store/imageScaleState";
import imageState from "./store/imageState";

const App = observer(() => {
  const { setImageScaleSize } = imageScaleState;
  const { file, imgUrl, setImgUrl, image, setImage } = imageState;
  const { isLoadSpinner, isScaleOpen, isFiltersOpen, setZoom, setLoadSpinner } =
    appState;

  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    setZoom(1);
  }, [file, setImgUrl, setZoom]);

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      setImage(img);
      setLoadSpinner(false);
    };
  }, [imgUrl, setImage, setLoadSpinner]);

  useEffect(() => {
    if (!image) return;
    setImageScaleSize(image.width, image.height);
  }, [image, setImageScaleSize]);

  if (!image) return <LoadImageScreen />;

  if (isScaleOpen) {
    return (
      <div className={styles.app}>
        <ScaleToolbar />
        <Workspace stageRef={stageRef} />
        {isLoadSpinner && <Spinner />}
      </div>
    );
  }

  if (isFiltersOpen) {
    return (
      <div className={styles.app}>
        <FiltersToolbar />
        <FiltersWorkspace stageRef={stageRef} />
        {isLoadSpinner && <Spinner />}
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Toolbar stageRef={stageRef} />
      <Workspace stageRef={stageRef} />
      {isLoadSpinner && <Spinner />}
    </div>
  );
});

export default App;
