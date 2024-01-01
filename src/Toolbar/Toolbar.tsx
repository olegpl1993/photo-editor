import { useEffect, useRef } from "react";
import { Filters } from "../types";
import styles from "./Toolbar.module.css";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      grayscale: number;
      sepia: number;
      invert: number;
    }>
  >;
  saveCanvasImage: () => void;
  loadUserImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Toolbar(props: Props) {
  const { filters, setFilters, saveCanvasImage, loadUserImage } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.className = styles.fileInput;
    input.style.display = "none";
    input.addEventListener("change", (event) =>
      loadUserImage(event as unknown as React.ChangeEvent<HTMLInputElement>)
    );
    document.body.appendChild(input);
    fileInputRef.current = input;

    return () => {
      document.body.removeChild(input);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parseInt(value),
    }));
  };

  const handleFilterReset = () => {
    setFilters({
      grayscale: 0,
      sepia: 0,
      invert: 0,
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.col}>
        <button onClick={handleButtonClick} className={styles.btn}>
          Load Photo
        </button>

        <button className={styles.btn} onClick={() => saveCanvasImage()}>
          Save Photo
        </button>

        <button className={styles.btn} onClick={handleFilterReset}>
          Reset Filters
        </button>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>grayscale</p>
        <input
          type="range"
          min="0"
          max="100"
          name="grayscale"
          value={filters.grayscale}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.grayscale}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>sepia</p>
        <input
          type="range"
          min="0"
          max="100"
          name="sepia"
          value={filters.sepia}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.sepia}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>invert</p>
        <input
          type="range"
          min="0"
          max="100"
          name="invert"
          value={filters.invert}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.invert}</p>
      </div>
    </div>
  );
}

export default Toolbar;
