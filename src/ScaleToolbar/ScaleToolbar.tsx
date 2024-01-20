import { Checkbox, IconButton, TextField } from "@mui/material";
import styles from "./ScaleToolbar.module.css";
import { useState } from "react";
import { imageNewSize } from "./ScaleToolbar.utils";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

interface Props {
  image: HTMLImageElement;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  setLoadSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  setIsScaleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ScaleToolbar(props: Props) {
  const { image, setImgUrl, setLoadSpinner, setIsScaleOpen } = props;

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary-color");

  const iconButtonSX = {
    height: "50px",
    width: "50px",
    border: `2px solid ${primaryColor}`,
    borderRadius: "50%",
    color: primaryColor,
  };

  const [imageSize, setImageSize] = useState({
    width: image.width,
    height: image.height,
  });

  const [isSaveRatio, setIsSaveRatio] = useState(true);

  console.log(imageSize);

  const handleScaleReset = () => {
    setImageSize({ width: image.width, height: image.height });
  };

  const handleImageSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = Number(event.target.value);

    console.log(value);

    if (isSaveRatio) {
      const aspectRatio =
        name === "width"
          ? image.height / image.width
          : image.width / image.height;

      setImageSize({
        width: name === "width" ? value : Math.round(value * aspectRatio),
        height: name === "height" ? value : Math.round(value * aspectRatio),
      });
    } else {
      setImageSize({
        width: name === "width" ? value : imageSize.width,
        height: name === "height" ? value : imageSize.height,
      });
    }
  };

  const handleImageApplySize = () => {
    setLoadSpinner(true);
    setTimeout(() => {
      imageNewSize(imageSize, image, setImgUrl);
    }, 0); // for spinner visibility before starting image rotation
  };

  return (
    <div className={styles.scaleToolbar}>
      <div className={styles.row}>
        <div className={styles.col}>
          <TextField
            type="number"
            label="width"
            name="width"
            size="small"
            value={String(imageSize?.width)}
            onChange={handleImageSizeChange}
            sx={{ width: "105px" }}
          />
          <TextField
            type="number"
            label="height"
            name="height"
            size="small"
            value={String(imageSize?.height)}
            onChange={handleImageSizeChange}
            sx={{ width: "105px" }}
          />
        </div>

        <Checkbox
          name="solarize"
          checked={!!isSaveRatio}
          onChange={() => setIsSaveRatio(!isSaveRatio)}
          sx={{ color: primaryColor }}
        />
        <p>Save ratio</p>
      </div>

      <div className={styles.iconsRow}>
        <IconButton
          title="Apply"
          onClick={handleImageApplySize}
          sx={iconButtonSX}
        >
          <SaveIcon fontSize="large" />
        </IconButton>

        <IconButton
          title="Reset scale"
          onClick={handleScaleReset}
          sx={iconButtonSX}
        >
          <FilterListOffIcon fontSize="large" />
        </IconButton>

        <IconButton
          title="Close"
          onClick={() => setIsScaleOpen(false)}
          sx={iconButtonSX}
        >
          <HighlightOffIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}

export default ScaleToolbar;
