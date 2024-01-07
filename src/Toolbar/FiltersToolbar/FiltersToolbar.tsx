import { Filters } from "../../types";
import styles from "./FiltersToolbar.module.css";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  isFiltersOpen: boolean;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function FiltersToolbar(props: Props) {
  const { filters, setFilters, isFiltersOpen, setIsFiltersOpen } = props;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Number(value),
    }));
  };

  if (isFiltersOpen) {
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

        <button
          className={styles.btn}
          onClick={() => {
            setIsFiltersOpen(false);
          }}
        >
          Apply
        </button>
      </div>
    );
  }
}

export default FiltersToolbar;
