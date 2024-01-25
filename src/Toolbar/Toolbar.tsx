import Konva from "konva";
import styles from "./Toolbar.module.css";
import { rotateImage } from "./Toolbar.utils";
import { loadImg } from "../App.utils";
import { IconButton } from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import TuneIcon from "@mui/icons-material/Tune";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import SaveModal from "./SaveModal/SaveModal";
import FullScreen from "./FullScreen/FullScreen";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import appState from "../store/appState";
import { observer } from "mobx-react-lite";

interface Props {
  file: File | null;
  stageRef: React.RefObject<Konva.Stage>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  image: HTMLImageElement;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
}

const Toolbar = observer((props: Props) => {
  const { file, stageRef, setFile, image, setImgUrl } = props;
  const { setLoadSpinner, setScaleOpen, setFiltersOpen } = appState;

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary-color");
  const iconButtonSX = {
    height: "50px",
    width: "50px",
    border: `2px solid ${primaryColor}`,
    borderRadius: "50%",
    color: primaryColor,
  };

  const handleRotateImage = async (direction: string) => {
    setLoadSpinner(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        rotateImage(direction, image, setImgUrl);
        resolve();
      }, 10);
    });
    setLoadSpinner(false);
  };

  return (
    <div className={styles.toolbar}>
      <IconButton
        title="Load image"
        onClick={() => loadImg(setFile)}
        sx={iconButtonSX}
      >
        <FileOpenIcon fontSize="large" />
      </IconButton>

      <SaveModal file={file} stageRef={stageRef} />

      <div className={styles.divider} />

      <IconButton
        title="Filters"
        onClick={() => setFiltersOpen(true)}
        sx={iconButtonSX}
      >
        <TuneIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Scale"
        onClick={() => setScaleOpen(true)}
        sx={iconButtonSX}
      >
        <AspectRatioIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Rotate left"
        onClick={() => handleRotateImage("left")}
        sx={iconButtonSX}
      >
        <RotateLeftIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Rotate right"
        onClick={() => handleRotateImage("right")}
        sx={iconButtonSX}
      >
        <RotateRightIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Mirror horizontal"
        onClick={() => handleRotateImage("horizontal")}
        sx={iconButtonSX}
      >
        <SwapHorizontalCircleIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Mirror vertical"
        onClick={() => handleRotateImage("vertical")}
        sx={iconButtonSX}
      >
        <SwapVerticalCircleIcon fontSize="large" />
      </IconButton>

      <div className={styles.divider} />

      <FullScreen />
    </div>
  );
});

export default Toolbar;
