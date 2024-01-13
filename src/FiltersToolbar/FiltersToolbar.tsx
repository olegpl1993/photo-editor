import { Filters } from "../types";
import styles from "./FiltersToolbar.module.css";
import { hexToRgb, rgbToHex, updateFiltersImage } from "./FiltersToolbar.utils";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image: HTMLImageElement;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
}

function FiltersToolbar(props: Props) {
  const { filters, setFilters, setIsFiltersOpen, image, setImgUrl } = props;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    if (checked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: 1,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: Number(value),
      }));
    }
  };

  const handleFilterRGB = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { r, g, b } = hexToRgb(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      red: r,
      green: g,
      blue: b,
    }));
  };

  const handleFilterReset = () => {
    const copyFilters: Record<string, number> = { ...filters };
    Object.keys(copyFilters).forEach((key) => {
      copyFilters[key] = 0;
    });
    copyFilters.pixelate = 1;
    setFilters(copyFilters);
  };

  const handleFiltersApply = () => {
    updateFiltersImage(image, filters, setImgUrl, setIsFiltersOpen);
    handleFilterReset();
  };

  const handleFiltersClose = () => {
    setIsFiltersOpen(false);
    handleFilterReset();
  };

  return (
    <div className={styles.filtersToolbar}>
      <div className={styles.row}>
        <p className={styles.label}>Contrast</p>
        <input
          type="range"
          min="-100"
          max="100"
          name="contrast"
          className={styles.input}
          value={filters.contrast}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.contrast}</p>
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

      <div className={styles.row}>
        <p className={styles.label}>Luminance</p>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.01"
          name="luminance"
          className={styles.input}
          value={filters.luminance}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.luminance}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Saturation</p>
        <input
          type="range"
          min="-5"
          max="5"
          step="0.01"
          name="saturation"
          className={styles.input}
          value={filters.saturation}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.saturation}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Hue</p>
        <input
          type="range"
          min="0"
          max="360"
          name="hue"
          className={styles.input}
          value={filters.hue}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.hue}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Blur</p>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          name="blur"
          className={styles.input}
          value={filters.blur}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.blur}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Posterize</p>
        <input
          type="range"
          min="0"
          max="0.1"
          step="0.01"
          name="posterize"
          className={styles.input}
          value={filters.posterize}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.posterize}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Pixelate</p>
        <input
          type="range"
          min="1"
          max="20"
          step="0.1"
          name="pixelate"
          className={styles.input}
          value={filters.pixelate}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.pixelate}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Threshold</p>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          name="threshold"
          className={styles.input}
          value={filters.threshold}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.threshold}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Noise</p>
        <input
          type="range"
          min="0"
          max="4"
          step="0.1"
          name="noise"
          className={styles.input}
          value={filters.noise}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.noise}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>RGBA</p>
        <input
          type="color"
          className={styles.input}
          onChange={handleFilterRGB}
          value={rgbToHex(filters.red, filters.green, filters.blue)}
        />
        <p className={styles.value}></p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Alpha</p>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          name="alpha"
          className={styles.input}
          value={filters.alpha}
          onChange={handleFilterChange}
        />
        <p className={styles.value}>{filters.alpha}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Grayscale</p>
        <input
          type="checkbox"
          name="grayscale"
          className={styles.inputCheckbox}
          checked={!!filters.grayscale}
          onChange={handleFilterChange}
        />
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Invert</p>
        <input
          type="checkbox"
          name="invert"
          className={styles.inputCheckbox}
          checked={!!filters.invert}
          onChange={handleFilterChange}
        />
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Sepia</p>
        <input
          type="checkbox"
          name="sepia"
          className={styles.inputCheckbox}
          checked={!!filters.sepia}
          onChange={handleFilterChange}
        />
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Solarize</p>
        <input
          type="checkbox"
          name="solarize"
          className={styles.inputCheckbox}
          checked={!!filters.solarize}
          onChange={handleFilterChange}
        />
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
