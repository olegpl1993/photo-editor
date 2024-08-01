import { Slider } from "@mui/material";
import { observer } from "mobx-react-lite";
import appState from "../../app/store/appState";
import styles from "./ZoomSlider.module.css";

const ZoomSlider = observer(() => {
  const { zoom, setZoom, isScaleOpen } = appState;

  const zoomPercent = Math.round(zoom * 100);

  const handleSetZoom = (_event: Event, newValue: number | number[]) => {
    setZoom((newValue as number) / 100);
  };

  return (
    <div className={`${styles.zoomSlider} ${isScaleOpen && styles.scaleOpen}`}>
      <Slider
        min={10}
        max={150}
        name="zoom"
        value={zoomPercent}
        onChange={handleSetZoom}
        sx={{
          width: "100px",
          color: "var(--primary-color)",
          "& .MuiSlider-thumb": { color: "var(--primary-color)" },
        }}
      />
      <p className={styles.value}>{zoomPercent}%</p>
    </div>
  );
});

export default ZoomSlider;
