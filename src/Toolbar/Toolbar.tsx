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
}

function Toolbar(props: Props) {
  const { filters, setFilters } = props;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parseInt(value),
    }));
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.row}>Toolbar</div>

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
