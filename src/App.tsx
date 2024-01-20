import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import Toolbar from "./Toolbar/Toolbar";
import Workspace from "./Workspace/Workspace";
import Konva from "konva";
import FiltersWorkspace from "./FiltersWorkspace/FiltersWorkspace";
import FiltersToolbar from "./FiltersToolbar/FiltersToolbar";
import { loadImg } from "./App.utils";
import { Filters } from "./types";
import Spinner from "./Spinner/Spinner";
import ScaleToolbar from "./ScaleToolbar/ScaleToolbar";

function App() {
  const stageRef = useRef<Konva.Stage>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [loadSpinner, setLoadSpinner] = useState(false);

  const [isScaleOpen, setIsScaleOpen] = useState(false);
  const [imageScaleSize, setImageScaleSize] = useState({ width: 1, height: 1 });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    blur: 0,
    brighten: 0,
    contrast: 0,
    grayscale: 0,
    invert: 0,
    noise: 0,
    pixelate: 1,
    posterize: 0,
    sepia: 0,
    solarize: 0,
    threshold: 0,
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
    hue: 0,
    saturation: 0,
    luminance: 0,
  });

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      setZoom(1);
    }
  }, [file]);

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      setImage(img);
      setTimeout(() => {
        setLoadSpinner(false);
      }, 0); // wait for image to load (for normal working spinner)
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
          setLoadSpinner={setLoadSpinner}
          setIsScaleOpen={setIsScaleOpen}
        />
        <Workspace
          image={image}
          stageRef={stageRef}
          zoom={zoom}
          setZoom={setZoom}
          isScaleOpen={isScaleOpen}
          imageScaleSize={imageScaleSize}
        />
        {loadSpinner && (
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
        <FiltersToolbar
          filters={filters}
          setFilters={setFilters}
          setIsFiltersOpen={setIsFiltersOpen}
          image={image}
          setImgUrl={setImgUrl}
          setLoadSpinner={setLoadSpinner}
        />
        <FiltersWorkspace filters={filters} image={image} stageRef={stageRef} />
        {loadSpinner && (
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
          setIsFiltersOpen={setIsFiltersOpen}
          image={image}
          setImgUrl={setImgUrl}
          setLoadSpinner={setLoadSpinner}
          setIsScaleOpen={setIsScaleOpen}
        />
        <Workspace
          image={image}
          stageRef={stageRef}
          zoom={zoom}
          setZoom={setZoom}
          isScaleOpen={isScaleOpen}
          imageScaleSize={imageScaleSize}
        />
        {loadSpinner && (
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
}

export default App;
