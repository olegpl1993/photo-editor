import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveIcon from "@mui/icons-material/Save";
import { Checkbox, IconButton, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import appState from "../store/appState";
import imageScaleState from "../store/imageScaleState";
import imageState from "../store/imageState";
import styles from "./ScaleToolbar.module.css";
import { imageNewSize } from "./ScaleToolbar.utils";

const ScaleToolbar = observer(() => {
  const { image, setImgUrl } = imageState;
  const { setLoadSpinner, setScaleOpen } = appState;
  const {
    imageScaleWidth,
    imageScaleHeight,
    setImageScaleSize,
    setImageScaleSizeByParam,
    setImageScaleSizeSaveRatio,
  } = imageScaleState;

  const [isSaveRatio, setIsSaveRatio] = useState(true);

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
    imageScaleWidth !== image?.width || imageScaleHeight !== image.height;

  const handleScaleReset = () => {
    if (!image) return;
    setImageScaleSize(image.width, image.height);
  };

  const handleImageScaleSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!image) return;
    const changeParam = event.target.name;
    const value = Math.min(parseInt(event.target.value) || 0, 10000);
    if (isSaveRatio) {
      setImageScaleSizeSaveRatio(changeParam, value, image.width, image.height);
    } else {
      setImageScaleSizeByParam(changeParam, value);
    }
  };

  const handleImageApplySize = async () => {
    if (!image) return;
    setLoadSpinner(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        imageNewSize(imageScaleWidth, imageScaleHeight, image, setImgUrl);
        resolve();
      }, 100);
    });
    handleScaleClose();
    setLoadSpinner(false);
  };

  const handleScaleClose = () => {
    handleScaleReset();
    setScaleOpen(false);
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
            value={String(imageScaleWidth)}
            onChange={handleImageScaleSizeChange}
            sx={{ width: "105px" }}
          />
          <TextField
            type="number"
            label="height"
            name="height"
            size="small"
            value={String(imageScaleHeight)}
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
});

export default ScaleToolbar;
