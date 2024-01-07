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
  updateFiltersImage: () => void;
}

function Toolbar(props: Props) {
  const {
    filters,
    setFilters,
    handleLoadImg,
    handleSaveCanvas,
    isFiltersOpen,
    setIsFiltersOpen,
    updateFiltersImage,
  } = props;

  const handleOpenFilters = () => {
    setIsFiltersOpen(true);
  };

  if (isFiltersOpen) {
    return (
      <div className={styles.toolbar}>
        <FiltersToolbar
          filters={filters}
          setFilters={setFilters}
          setIsFiltersOpen={setIsFiltersOpen}
          updateFiltersImage={updateFiltersImage}
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

        <button className={styles.btn} onClick={handleOpenFilters}>
          Filters
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
