import Konva from "konva";
import styles from "./Toolbar.module.css";
import { rotateImage, saveCanvas } from "./Toolbar.utils";
import { loadImg } from "../App.utils";
import { IconButton } from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import TuneIcon from "@mui/icons-material/Tune";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";

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
        sx={{
          height: "50px",
          width: "50px",
          border: "2px solid gray",
          borderRadius: "50%",
        }}
      >
        <FileOpenIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Save image"
        onClick={() => saveCanvas(file, stageRef)}
        sx={{
          height: "50px",
          width: "50px",
          border: "2px solid gray",
          borderRadius: "50%",
        }}
      >
        <DriveFolderUploadIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Filters"
        onClick={() => setIsFiltersOpen(true)}
        sx={{
          height: "50px",
          width: "50px",
          border: "2px solid gray",
          borderRadius: "50%",
        }}
      >
        <TuneIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Rotate right"
        onClick={() => handleRotateImage("right")}
        sx={{
          height: "50px",
          width: "50px",
          border: "2px solid gray",
          borderRadius: "50%",
        }}
      >
        <RotateRightIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Rotate left"
        onClick={() => handleRotateImage("left")}
        sx={{
          height: "50px",
          width: "50px",
          border: "2px solid gray",
          borderRadius: "50%",
        }}
      >
        <RotateLeftIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Mirror horizontal"
        onClick={() => handleRotateImage("horizontal")}
        sx={{
          height: "50px",
          width: "50px",
          border: "2px solid gray",
          borderRadius: "50%",
        }}
      >
        <SwapHorizontalCircleIcon fontSize="large" />
      </IconButton>

      <IconButton
        title="Mirror vertical"
        onClick={() => handleRotateImage("vertical")}
        sx={{
          height: "50px",
          width: "50px",
          border: "2px solid gray",
          borderRadius: "50%",
        }}
      >
        <SwapVerticalCircleIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default Toolbar;
