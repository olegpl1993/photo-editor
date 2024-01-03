import { Filters } from "../types";
import styles from "./Toolbar.module.css";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      blur: number;
    }>
  >;
  handleSaveCanvas: () => void;
  loadUserImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Toolbar(props: Props) {
  const { filters, setFilters, handleSaveCanvas, loadUserImage } = props;

  const handleLoadImg = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.className = styles.fileInput;
    input.style.display = "none";

    const changeEvent = (event: Event) => {
      return loadUserImage(
        event as unknown as React.ChangeEvent<HTMLInputElement>
      );
    };

    input.addEventListener("change", changeEvent);
    document.body.appendChild(input);

    input.click();
    document.body.removeChild(input);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parseInt(value),
    }));
  };

  const handleFilterReset = () => {
    setFilters({
      blur: 0,
    });
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.col}>
        <button onClick={handleLoadImg} className={styles.btn}>
          Load Photo
        </button>

        <button className={styles.btn} onClick={() => handleSaveCanvas()}>
          Save Photo
        </button>

        <button className={styles.btn} onClick={handleFilterReset}>
          Reset Filters
        </button>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>blur</p>
        <input
          type="range"
          min="0"
          max="100"
          name="blur"
          value={filters.blur}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.blur}</p>
      </div>
    </div>
  );
}

export default Toolbar;
