import styles from "./LoadImageScreen.module.css";
import { observer } from "mobx-react-lite";
import appState from "../store/appState";
import imageState from "../store/imageState";
import Spinner from "../Spinner/Spinner";
import { loadImg } from "./LoadImageScreen.utils";

const LoadImageScreen = observer(() => {
  const { isLoadSpinner, setLoadSpinner } = appState;
  const { setFile } = imageState;

  if (isLoadSpinner) {
    return (
      <div className={styles.loadImageScreen}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.loadImageScreen}>
      <button
        onClick={() => loadImg(setFile, setLoadSpinner)}
        className={styles.loadPhotoBtn}
      >
        LOAD PHOTO
      </button>
    </div>
  );
});

export default LoadImageScreen;
