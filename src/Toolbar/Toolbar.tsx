import Konva from "konva";
import styles from "./Toolbar.module.css";
import { rotateImage, saveCanvas } from "./Toolbar.utils";
import { loadImg } from "../App.utils";

interface Props {
  file: File | null;
  stageRef: React.RefObject<Konva.Stage>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image: HTMLImageElement;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
}

function Toolbar(props: Props) {
  const { file, stageRef, setFile, setIsFiltersOpen, image, setImgUrl } = props;

  const handleRotateImage = (direction: string) => {
    rotateImage(direction, image, setImgUrl);
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.col}>
        <button onClick={() => loadImg(setFile)} className={styles.btn}>
          Load Photo
        </button>

        <button
          className={styles.btn}
          onClick={() => saveCanvas(file, stageRef)}
        >
          Save Photo
        </button>

        <button className={styles.btn} onClick={() => setIsFiltersOpen(true)}>
          Filters
        </button>

        <button
          className={styles.btn}
          onClick={() => handleRotateImage("right")}
        >
          Rotate right
        </button>

        <button
          className={styles.btn}
          onClick={() => handleRotateImage("left")}
        >
          Rotate left
        </button>

        <button
          className={styles.btn}
          onClick={() => handleRotateImage("horizontal")}
        >
          Mirror horizontal
        </button>

        <button
          className={styles.btn}
          onClick={() => handleRotateImage("vertical")}
        >
          Mirror vertical
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
