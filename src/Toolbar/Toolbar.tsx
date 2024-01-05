import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Filters } from "../types";
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Number(value),
    }));
  };

  const handleChangeAccordion = (index: number) => {
    setIsFiltersOpen(index === 0);
  };

  console.log("isFiltersOpen", isFiltersOpen);

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
      </div>

      <Accordion
        allowToggle
        width={"100%"}
        defaultIndex={isFiltersOpen ? [0] : []}
        onChange={handleChangeAccordion}
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Filters
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
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
          </AccordionPanel>

          <AccordionPanel pb={4}>
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Toolbar;
