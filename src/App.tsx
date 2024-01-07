import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import Toolbar from "./Toolbar/Toolbar";
import Workspace from "./Workspace/Workspace";
import Konva from "konva";
import useImage from "use-image";
import FiltersWorkspace from "./FiltersWorkspace/FiltersWorkspace";

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
  const [image] = useImage(imgUrl, "anonymous");

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    }
  }, [file]);

  const handleLoadImg = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.className = styles.fileInput;
    input.style.display = "none";

    const changeLoadEvent = (event: Event) => {
      const loadEvent = event as unknown as React.ChangeEvent<HTMLInputElement>;
      const file = loadEvent.target?.files?.[0];
      if (file) {
        setFile(file);
      }
    };

    input.addEventListener("change", changeLoadEvent);
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const handleSaveCanvas = () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL();
      const downloadLink = document.createElement("a");
      downloadLink.href = dataURL || "";
      downloadLink.download = "saved_canvas.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  if (image) {
    return (
      <div className={styles.app}>
        <Toolbar
          filters={filters}
          setFilters={setFilters}
          handleSaveCanvas={handleSaveCanvas}
          handleLoadImg={handleLoadImg}
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
        />

        {isFiltersOpen ? (
          <FiltersWorkspace
            filters={filters}
            image={image}
            stageRef={stageRef}
          />
        ) : (
          <Workspace filters={filters} image={image} stageRef={stageRef} />
        )}
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <div className={styles.loadPhotoWrapper}>
        <button onClick={handleLoadImg} className={styles.loadPhotoBtn}>
          Load Photo
        </button>
      </div>
    </div>
  );
}

export default App;
