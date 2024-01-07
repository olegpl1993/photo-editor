import { Filters } from "../../types";
import styles from "./FiltersToolbar.module.css";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateFiltersImage: () => void;
}

function FiltersToolbar(props: Props) {
  const { filters, setFilters, setIsFiltersOpen, updateFiltersImage } = props;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Number(value),
    }));
  };

  const handleFilterReset = () => {
    const copyFilters = { ...filters };
    Object.keys(copyFilters).forEach((key) => {
      copyFilters[key as keyof Filters] = 0;
    });
    setFilters(copyFilters);
  };

  const handleFiltersApply = () => {
    updateFiltersImage();
    handleFilterReset();
  };

  const handleFiltersClose = () => {
    setIsFiltersOpen(false);
    handleFilterReset();
  };

  return (
    <div className={styles.filtersToolbar}>
      <div className={styles.row}>
        <p className={styles.label}>Blur</p>
        <input
          type="range"
          min="0"
          max="100"
          name="blur"
          className={styles.input}
          value={filters.blur}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.blur}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Brighten</p>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          name="brighten"
          className={styles.input}
          value={filters.brighten}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.brighten}</p>
      </div>

      <button className={styles.btn} onClick={handleFilterReset}>
        Reset
      </button>

      <button className={styles.btn} onClick={handleFiltersClose}>
        Close
      </button>

      <button className={styles.btn} onClick={handleFiltersApply}>
        Apply
      </button>
    </div>
  );
}

export default FiltersToolbar;
