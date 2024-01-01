import { useState } from "react";
import styles from "./App.module.css";
import Toolbar from "./Toolbar/Toolbar";
import Workspace from "./Workspace/Workspace";

function App() {
  const [filters, setFilters] = useState({
    grayscale: 0,
    sepia: 0,
    invert: 0,
  });

  return (
    <div className={styles.app}>
      <Toolbar filters={filters} setFilters={setFilters} />
      <Workspace filters={filters} />
    </div>
  );
}

export default App;
