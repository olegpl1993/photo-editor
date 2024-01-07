import { Filters } from "../types";
import FiltersToolbar from "./FiltersToolbar/FiltersToolbar";
import styles from "./Toolbar.module.css";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  handleLoadImg: () => void;
  handleSaveCanvas: () => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Toolbar(props: Props) {
  const {
    filters,
    setFilters,
    handleLoadImg,
    handleSaveCanvas,
    isFiltersOpen,
    setIsFiltersOpen,
  } = props;

  const handleFilterReset = () => {
    const copyFilters = { ...filters };
    Object.keys(copyFilters).forEach((key) => {
      copyFilters[key as keyof Filters] = 0;
    });
    setFilters(copyFilters);
  };

  const handleOpenFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  console.log("isFiltersOpen", isFiltersOpen);

  if (isFiltersOpen) {
    return (
      <div className={styles.toolbar}>
        <FiltersToolbar
          filters={filters}
          setFilters={setFilters}
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
        />
      </div>
    );
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.col}>
        <button onClick={handleLoadImg} className={styles.btn}>
          Load Photo
        </button>

        <button className={styles.btn} onClick={handleSaveCanvas}>
          Save Photo
        </button>

        <button className={styles.btn} onClick={handleFilterReset}>
          Reset Filters
        </button>

        <button className={styles.btn} onClick={handleOpenFilters}>
          Filters
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
