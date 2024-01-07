import { Filters } from "../types";
import FiltersTools from "./FiltersTools/FiltersTools";
import styles from "./Toolbar.module.css";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  handleSaveCanvas: () => void;
  loadUserImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Toolbar(props: Props) {
  const {
    filters,
    setFilters,
    handleSaveCanvas,
    loadUserImage,
    isFiltersOpen,
    setIsFiltersOpen,
  } = props;

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
        <FiltersTools
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
