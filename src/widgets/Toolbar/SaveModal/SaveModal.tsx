import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Button, IconButton, Slider } from "@mui/material";
import Konva from "konva";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import appState from "../../../app/store/appState";
import imageState from "../../../app/store/imageState";
import styles from "./SaveModal.module.css";
import { saveCanvas } from "./SaveModal.utils";

interface Props {
  stageRef: React.RefObject<Konva.Stage>;
}

const SaveModal = observer((props: Props) => {
  const { stageRef } = props;
  const { file } = imageState;
  const { setCropActive } = appState;

  const [modalActive, setModalActive] = useState(false);
  const [quality, setQuality] = useState(1);

  const buttonSX = {
    color: "var(--primary-color)",
    border: `2px solid var(--primary-color)`,
    "&:hover": { border: `3px solid var(--primary-color)` },
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

  const handleClickOpen = () => {
    setModalActive(true);
    setCropActive(false);
  };

  return (
    <div className={styles.saveModal}>
      <IconButton
        title="Save image"
        sx={{
          height: "50px",
          width: "50px",
          border: `2px solid var(--primary-color)`,
          borderRadius: "50%",
          color: "var(--primary-color)",
        }}
        onClick={handleClickOpen}
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
                      color: "var(--primary-color)",
                      "& .MuiSlider-thumb": { color: "var(--primary-color)" },
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
});

export default SaveModal;
