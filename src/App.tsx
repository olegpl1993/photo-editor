import { useRef, useState } from "react";
import styles from "./App.module.css";
import Toolbar from "./Toolbar/Toolbar";
import Workspace from "./Workspace/Workspace";

function App() {
  console.log("app");
  const [filters, setFilters] = useState({
    grayscale: 0,
    sepia: 0,
    invert: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  const [file, setFile] = useState<File | null>(null);

  const saveCanvasImage = () => {
    const canvas = canvasRef.current!;
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "filtered_image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const loadUserImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFile(file);
  };

  return (
    <div className={styles.app}>
      <Toolbar
        filters={filters}
        setFilters={setFilters}
        saveCanvasImage={saveCanvasImage}
        loadUserImage={loadUserImage}
      />
      <Workspace
        filters={filters}
        canvasRef={canvasRef}
        imageRef={imageRef}
        file={file}
      />
    </div>
  );
}

export default App;
