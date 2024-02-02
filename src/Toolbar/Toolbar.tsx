import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CropIcon from "@mui/icons-material/Crop";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import TuneIcon from "@mui/icons-material/Tune";
import { IconButton } from "@mui/material";
import Konva from "konva";
import { observer } from "mobx-react-lite";
import { loadImg } from "../LoadImageScreen/LoadImageScreen.utils";
import appState from "../store/appState";
import imageState from "../store/imageState";
import FullScreen from "./FullScreen/FullScreen";
import SaveModal from "./SaveModal/SaveModal";
import styles from "./Toolbar.module.css";
import { rotateImage } from "./Toolbar.utils";

interface Props {
  stageRef: React.RefObject<Konva.Stage>;
}

const Toolbar = observer((props: Props) => {
  const { stageRef } = props;
  const { setFile, setImgUrl, image } = imageState;
  const {
    setLoadSpinner,
    setScaleOpen,
    setFiltersOpen,
    isCropActive,
    setCropActive,
  } = appState;

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary-color");
  const activeColor = rootStyles.getPropertyValue("--active-color");
  const iconButtonSX = {
    height: "50px",
    width: "50px",
    border: `2px solid ${primaryColor}`,
    borderRadius: "50%",
    color: primaryColor,
  };

  const handleRotateImage = async (direction: string) => {
    if (!image) return;
    setCropActive(false);
    setLoadSpinner(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        rotateImage(direction, image, setImgUrl);
        resolve();
      }, 10);
    });
    setLoadSpinner(false);
  };

  const handleLoadImg = () => {
    loadImg(setFile, setLoadSpinner);
    setCropActive(false);
  };

  const handleFiltersOpen = () => {
    setFiltersOpen(true);
    setCropActive(false);
  };

  const handleScaleOpen = () => {
    setScaleOpen(true);
    setCropActive(false);
  };

  return (
    <div className={styles.toolbar}>
      <IconButton title="Load image" onClick={handleLoadImg} sx={iconButtonSX}>
        <FileOpenIcon fontSize="large" />
      </IconButton>

      <SaveModal stageRef={stageRef} />

      <div className={styles.divider} />

      <IconButton title="Filters" onClick={handleFiltersOpen} sx={iconButtonSX}>
        <TuneIcon fontSize="large" />
      </IconButton>

      <IconButton title="Scale" onClick={handleScaleOpen} sx={iconButtonSX}>
        <AspectRatioIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Crop"
        onClick={() => setCropActive(!isCropActive)}
        sx={{
          ...iconButtonSX,
          borderColor: isCropActive ? activeColor : primaryColor,
        }}
      >
        <CropIcon
          fontSize="large"
          sx={{ color: isCropActive ? activeColor : primaryColor }}
        />
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
