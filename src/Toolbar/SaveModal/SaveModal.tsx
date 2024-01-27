import { Button, IconButton, Slider } from "@mui/material";
import styles from "./SaveModal.module.css";
import { useEffect, useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Konva from "konva";
import { saveCanvas } from "./SaveModal.utils";

interface Props {
  file: File | null;
  stageRef: React.RefObject<Konva.Stage>;
}

const SaveModal = (props: Props) => {
  const { file, stageRef } = props;
  const [modalActive, setModalActive] = useState(false);
  const [quality, setQuality] = useState(1);

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary-color");
  const buttonSX = {
    color: primaryColor,
    border: `2px solid ${primaryColor}`,
    "&:hover": { border: `3px solid ${primaryColor}` },
    height: "100px",
    width: "100px",
    fontSize: "20px",
  };

  useEffect(() => {
    document.body.style.overflow = modalActive ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  return (
    <div className={styles.saveModal}>
      <IconButton
        title="Save image"
        sx={{
          height: "50px",
          width: "50px",
          border: `2px solid ${primaryColor}`,
          borderRadius: "50%",
          color: primaryColor,
        }}
        onClick={() => setModalActive(true)}
      >
        <DriveFolderUploadIcon fontSize="large" />
      </IconButton>

      {modalActive && (
        <div className={styles.wrapper} onClick={() => setModalActive(false)}>
          <div
            className={styles.box}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              className={styles.close}
              onClick={() => setModalActive(false)}
            />

            <div className={styles.content}>
              <div className={styles.title}>Save photo</div>
              <div className={styles.layer}>
                <div className={styles.col}>
                  <Button
                    variant="outlined"
                    onClick={() => saveCanvas(file, stageRef, "png", quality)}
                    sx={buttonSX}
                  >
                    PNG
                  </Button>
                  <div className={styles.row}>
                    <p className={styles.label}>Maximum quality</p>
                  </div>
                </div>

                <div className={styles.col}>
                  <Button
                    variant="outlined"
                    onClick={() => saveCanvas(file, stageRef, "jpeg", quality)}
                    sx={buttonSX}
                  >
                    JPEG
                  </Button>

                  <div className={styles.row}>
                    <p className={styles.label}>Quality</p>
                    <p className={styles.value}>{quality}</p>
                  </div>
                  <Slider
                    min={0.1}
                    max={1}
                    step={0.1}
                    name="quality"
                    value={quality}
                    onChange={(_event, value) => setQuality(value as number)}
                    sx={{
                      padding: "20px 0px",
                      width: "100px",
                      color: primaryColor,
                      "& .MuiSlider-thumb": { color: primaryColor },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveModal;
