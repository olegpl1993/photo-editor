import { useRef, useState } from "react";
import styles from "./App.module.css";
import Toolbar from "./Toolbar/Toolbar";
import Workspace from "./Workspace/Workspace";
import Konva from "konva";
import useImage from "use-image";

function App() {
  console.log("app");
  const [filters, setFilters] = useState({
    blur: 0,
  });

  const [scale, setScale] = useState(1);

  const stageRef = useRef<Konva.Stage>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [image] = useImage(imgUrl || "/dragon.jpg", "anonymous");

  const loadUserImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    }
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

  return (
    <div className={styles.app}>
      <Toolbar
        filters={filters}
        setFilters={setFilters}
        handleSaveCanvas={handleSaveCanvas}
        loadUserImage={loadUserImage}
        setScale={setScale}
      />

      {image && (
        <Workspace
          filters={filters}
          image={image}
          stageRef={stageRef}
          scale={scale}
        />
      )}
    </div>
  );
}

export default App;
