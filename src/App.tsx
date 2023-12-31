import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import Toolbar from "./Toolbar/Toolbar";
import Workspace from "./Workspace/Workspace";
import Konva from "konva";
import FiltersWorkspace from "./FiltersWorkspace/FiltersWorkspace";
import FiltersToolbar from "./FiltersToolbar/FiltersToolbar";
import { loadImg } from "./App.service";

function App() {
  console.log("app");
  const [filters, setFilters] = useState({
    blur: 0,
    brighten: 0,
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const stageRef = useRef<Konva.Stage>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      setImage(img);
    };
  }, [imgUrl]);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    }
  }, [file]);

  if (image && isFiltersOpen) {
    return (
      <div className={styles.app}>
        <FiltersToolbar
          filters={filters}
          setFilters={setFilters}
          setIsFiltersOpen={setIsFiltersOpen}
          image={image}
          setImgUrl={setImgUrl}
        />
        <FiltersWorkspace filters={filters} image={image} stageRef={stageRef} />
      </div>
    );
  }

  if (image && !isFiltersOpen) {
    return (
      <div className={styles.app}>
        <Toolbar
          file={file}
          stageRef={stageRef}
          setFile={setFile}
          setIsFiltersOpen={setIsFiltersOpen}
          image={image}
          setImgUrl={setImgUrl}
        />
        <Workspace image={image!} stageRef={stageRef} />
      </div>
    );
  }

  return (
    <div className={styles.loadPhotoWrapper}>
      <button onClick={() => loadImg(setFile)} className={styles.loadPhotoBtn}>
        Load Photo
      </button>
    </div>
  );
}

export default App;
