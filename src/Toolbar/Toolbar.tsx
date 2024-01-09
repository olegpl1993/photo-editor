import styles from "./Toolbar.module.css";

interface Props {
  handleLoadImg: () => void;
  handleSaveCanvas: () => void;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rotateImage: (direction: string) => void;
}

function Toolbar(props: Props) {
  const {
    handleLoadImg,
    handleSaveCanvas,
    setIsFiltersOpen,
    rotateImage,
  } = props;

  return (
    <div className={styles.toolbar}>
      <div className={styles.col}>
        <button onClick={handleLoadImg} className={styles.btn}>
          Load Photo
        </button>

        <button className={styles.btn} onClick={handleSaveCanvas}>
          Save Photo
        </button>

        <button className={styles.btn} onClick={() => setIsFiltersOpen(true)}>
          Filters
        </button>

        <button className={styles.btn} onClick={() => rotateImage("right")}>
          Rotate right
        </button>

        <button className={styles.btn} onClick={() => rotateImage("left")}>
          Rotate left
        </button>

        <button
          className={styles.btn}
          onClick={() => rotateImage("horizontal")}
        >
          Mirror horizontal
        </button>

        <button
          className={styles.btn}
          onClick={() => rotateImage("vertical")}
        >
          Mirror vertical
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
