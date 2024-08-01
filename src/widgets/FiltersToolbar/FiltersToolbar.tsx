import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveIcon from "@mui/icons-material/Save";
import { Checkbox, IconButton, Slider } from "@mui/material";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import appState from "../../app/store/appState";
import filtersState from "../../app/store/filtersState";
import imageState from "../../app/store/imageState";
import styles from "./FiltersToolbar.module.css";
import { hexToRgb, rgbToHex, updateFiltersImage } from "./FiltersToolbar.utils";

const FiltersToolbar = observer(() => {
  const { image, setImgUrl } = imageState;
  const { setFilter, resetFilters, setFilterRGB } = filtersState;
  const { setLoadSpinner, setFiltersOpen } = appState;
  const filters = toJS(filtersState.filters);

  const [baseFilters] = useState(JSON.stringify(filters));
  const isFiltersChanged = baseFilters !== JSON.stringify(filters);

  const sliderSX = {
    width: "100px",
    color: "var(--primary-color)",
    "& .MuiSlider-thumb": { color: "var(--primary-color)" },
  };
  const checkboxSX = { marginRight: "10px", color: "var(--primary-color)" };
  const iconButtonSX = {
    height: "50px",
    width: "50px",
    border: `2px solid var(--primary-color)`,
    borderRadius: "50%",
    color: "var(--primary-color)",
  };

  const handleFilter = (event: Event, newValue: number | number[]) => {
    const { name } = event.target as HTMLInputElement;
    setFilter(name, newValue as number);
  };

  const handleFilterChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { name } = event.target;
    setFilter(name, checked ? 1 : 0);
  };

  const handleFilterRGB = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { r, g, b } = hexToRgb(value);
    setFilterRGB(r, g, b);
  };

  const handleFilterReset = () => {
    resetFilters();
  };

  const handleFiltersClose = () => {
    setFiltersOpen(false);
    resetFilters();
  };

  const handleFiltersApply = async () => {
    if (!image) return;
    setLoadSpinner(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        updateFiltersImage(image, filters, setImgUrl);
        resolve();
      }, 100);
    });
    handleFiltersClose();
    setLoadSpinner(false);
  };

  return (
    <div className={styles.filtersToolbar}>
      <div className={styles.row}>
        <p className={styles.label}>Contrast</p>
        <Slider
          min={-100}
          max={100}
          step={1}
          name="contrast"
          value={filters.contrast}
          onChange={handleFilter}
          sx={sliderSX}
        />
        <p className={styles.value}>{filters.contrast}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Brighten</p>
        <Slider
          min={-1}
          max={1}
          step={0.01}
          name="brighten"
          value={filters.brighten}
          onChange={handleFilter}
          sx={sliderSX}
        />
        <p className={styles.value}>{filters.brighten}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Luminance</p>
        <Slider
          min={-2}
          max={2}
          step={0.01}
          name="luminance"
          value={filters.luminance}
          onChange={handleFilter}
          sx={sliderSX}
        />
        <p className={styles.value}>{filters.luminance}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Saturation</p>
        <Slider
          min={-5}
          max={5}
          step={0.01}
          name="saturation"
          value={filters.saturation}
          onChange={handleFilter}
          sx={sliderSX}
        />
        <p className={styles.value}>{filters.saturation}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Hue</p>
        <Slider
          min={0}
          max={360}
          step={1}
          name="hue"
          value={filters.hue}
          onChange={handleFilter}
          sx={sliderSX}
        />
        <p className={styles.value}>{filters.hue}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Blur</p>
        <Slider
          min={0}
          max={10}
          step={0.5}
          name="blur"
          value={filters.blur}
          onChange={handleFilter}
          sx={sliderSX}
        />
        <p className={styles.value}>{filters.blur}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Posterize</p>
        <Slider
          min={0}
          max={0.1}
          step={0.01}
          name="posterize"
          value={filters.posterize}
          onChange={handleFilter}
          sx={sliderSX}
        />
        <p className={styles.value}>{filters.posterize}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Pixelate</p>
        <Slider
          min={1}
          max={10}
          step={0.1}
          name="pixelate"
          value={filters.pixelate}
          onChange={handleFilter}
          sx={sliderSX}
        />
        <p className={styles.value}>{filters.pixelate}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Threshold</p>
        <Slider
          min={0}
          max={1}
          step={0.01}
          name="threshold"
          value={filters.threshold}
          onChange={handleFilter}
          sx={sliderSX}
        />
        <p className={styles.value}>{filters.threshold}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Noise</p>
        <Slider
          min={0}
          max={2}
          step={0.1}
          name="noise"
          value={filters.noise}
          onChange={handleFilter}
          sx={sliderSX}
        />
        <p className={styles.value}>{filters.noise}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>RGBA</p>
        <input
          type="color"
          className={styles.inputColor}
          onChange={handleFilterRGB}
          value={rgbToHex(filters.red, filters.green, filters.blue)}
        />
        <p className={styles.value}></p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Alpha</p>
        <Slider
          min={0}
          max={1}
          step={0.01}
          name="alpha"
          value={filters.alpha}
          onChange={handleFilter}
          sx={sliderSX}
        />
        <p className={styles.value}>{filters.alpha}</p>
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Grayscale</p>
        <Checkbox
          name="grayscale"
          checked={!!filters.grayscale}
          onChange={handleFilterChecked}
          sx={checkboxSX}
        />
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Invert</p>
        <Checkbox
          name="invert"
          checked={!!filters.invert}
          onChange={handleFilterChecked}
          sx={checkboxSX}
        />
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Sepia</p>
        <Checkbox
          name="sepia"
          checked={!!filters.sepia}
          onChange={handleFilterChecked}
          sx={checkboxSX}
        />
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Solarize</p>
        <Checkbox
          name="solarize"
          checked={!!filters.solarize}
          onChange={handleFilterChecked}
          sx={checkboxSX}
        />
      </div>

      <div className={styles.iconsRow}>
        <IconButton
          title="Apply"
          onClick={handleFiltersApply}
          sx={{
            ...iconButtonSX,
            border: `2px solid ${
              isFiltersChanged ? "var(--primary-color)" : "#AAAAAA"
            }`,
          }}
          disabled={!isFiltersChanged}
        >
          <SaveIcon fontSize="large" />
        </IconButton>

        <IconButton
          title="Reset filters"
          onClick={handleFilterReset}
          sx={{
            ...iconButtonSX,
            border: `2px solid ${
              isFiltersChanged ? "var(--primary-color)" : "#AAAAAA"
            }`,
          }}
          disabled={!isFiltersChanged}
        >
          <FilterListOffIcon fontSize="large" />
        </IconButton>

        <IconButton
          title="Close"
          onClick={handleFiltersClose}
          sx={iconButtonSX}
        >
          <HighlightOffIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
});

export default FiltersToolbar;
