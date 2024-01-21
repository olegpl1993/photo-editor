import { Checkbox, IconButton, TextField } from "@mui/material";
import styles from "./ScaleToolbar.module.css";
import { useState } from "react";
import { imageNewSize } from "./ScaleToolbar.utils";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

interface Props {
  image: HTMLImageElement;
  imageScaleSize: { width: number; height: number };
  setImageScaleSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  setLoadSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  setIsScaleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ScaleToolbar(props: Props) {
  const {
    image,
    setImgUrl,
    setLoadSpinner,
    setIsScaleOpen,
    imageScaleSize,
    setImageScaleSize,
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
  const isSizeChanged =
    imageScaleSize.width !== image.width ||
    imageScaleSize.height !== image.height;
  const [isSaveRatio, setIsSaveRatio] = useState(true);

  const handleScaleReset = () => {
    setImageScaleSize({ width: image.width, height: image.height });
  };

  const handleImageScaleSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = Math.min(parseInt(event.target.value) || 0, 10000);

    if (isSaveRatio) {
      const aspectRatio =
        name === "width"
          ? image.height / image.width
          : image.width / image.height;

      setImageScaleSize({
        width: name === "width" ? value : Math.round(value * aspectRatio),
        height: name === "height" ? value : Math.round(value * aspectRatio),
      });
    } else {
      setImageScaleSize({
        width: name === "width" ? value : imageScaleSize.width,
        height: name === "height" ? value : imageScaleSize.height,
      });
    }
  };

  const handleImageApplySize = async () => {
    setLoadSpinner(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        imageNewSize(imageScaleSize, image, setImgUrl);
        resolve();
      }, 0);
    });
    handleScaleClose();
    setLoadSpinner(false);
  };

  const handleScaleClose = () => {
    handleScaleReset();
    setIsScaleOpen(false);
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
            value={String(imageScaleSize?.width)}
            onChange={handleImageScaleSizeChange}
            sx={{ width: "105px" }}
          />
          <TextField
            type="number"
            label="height"
            name="height"
            size="small"
            value={String(imageScaleSize?.height)}
            onChange={handleImageScaleSizeChange}
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
          sx={{
            ...iconButtonSX,
            border: `2px solid ${isSizeChanged ? primaryColor : "#AAAAAA"}`,
          }}
          disabled={!isSizeChanged}
        >
          <SaveIcon fontSize="large" />
        </IconButton>

        <IconButton
          title="Reset scale"
          onClick={handleScaleReset}
          sx={{
            ...iconButtonSX,
            border: `2px solid ${isSizeChanged ? primaryColor : "#AAAAAA"}`,
          }}
          disabled={!isSizeChanged}
        >
          <FilterListOffIcon fontSize="large" />
        </IconButton>

        <IconButton title="Close" onClick={handleScaleClose} sx={iconButtonSX}>
          <HighlightOffIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}

export default ScaleToolbar;
