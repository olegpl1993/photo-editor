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

interface Props {
  file: File | null;
  stageRef: React.RefObject<Konva.Stage>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image: HTMLImageElement;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  setLoadSpinner: React.Dispatch<React.SetStateAction<boolean>>;
}

function Toolbar(props: Props) {
  const {
    file,
    stageRef,
    setFile,
    setIsFiltersOpen,
    image,
    setImgUrl,
    setLoadSpinner,
  } = props;

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary-color");
  const iconButtonSX = {
    height: "50px",
    width: "50px",
    border: `2px solid ${primaryColor}`,
    borderRadius: "50%",
    color: primaryColor,
  };

  const handleRotateImage = (direction: string) => {
    setLoadSpinner(true);
    setTimeout(() => {
      rotateImage(direction, image, setImgUrl);
    }, 0); // for spinner visibility before starting image rotation
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

      <IconButton
        title="Filters"
        onClick={() => setIsFiltersOpen(true)}
        sx={iconButtonSX}
      >
        <TuneIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Rotate right"
        onClick={() => handleRotateImage("right")}
        sx={iconButtonSX}
      >
        <RotateRightIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Rotate left"
        onClick={() => handleRotateImage("left")}
        sx={iconButtonSX}
      >
        <RotateLeftIcon fontSize="large" />
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
    </div>
  );
}

export default Toolbar;
