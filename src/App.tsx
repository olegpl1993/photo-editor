import { useRef, useState } from "react";
import styles from "./App.module.css";
import Toolbar from "./Toolbar/Toolbar";
import Workspace, { WorkspaceRef } from "./Workspace/Workspace";

function App() {
  const [filters, setFilters] = useState({
    grayscale: 0,
    sepia: 0,
    invert: 0,
  });

  const ref = useRef<WorkspaceRef | null>(null);
  const saveImage = () => {
    ref.current?.saveCanvasImage();
  };

  const loadUserImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    ref.current?.loadUserImage(event);
  }

  return (
    <div className={styles.app}>
      <Toolbar
        filters={filters}
        setFilters={setFilters}
        saveImage={saveImage}
        loadUserImage={loadUserImage}
      />
      <Workspace filters={filters} ref={ref} />
    </div>
  );
}

export default App;
