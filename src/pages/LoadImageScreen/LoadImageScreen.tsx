import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import appState from "../../app/store/appState";
import imageState from "../../app/store/imageState";
import Spinner from "../../shared/Spinner/Spinner";
import styles from "./LoadImageScreen.module.css";

const LoadImageScreen = observer(() => {
  const { isLoadSpinner, setLoadSpinner } = appState;
  const { setFile } = imageState;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file) return;
      setLoadSpinner(true);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setFile(file);
          resolve();
        }, 100);
      });
    }
  };

  if (isLoadSpinner) {
    return (
      <div className={styles.loadImageScreen}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.loadImageScreen}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        sx={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--primary-color)",
          fontSize: "22px",
          color: "white",
          "&:hover": {
            backgroundColor: "var(--primary-color)",
            color: "white",
          },
        }}
      >
        LOAD PHOTO
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
    </div>
  );
});

export default LoadImageScreen;
