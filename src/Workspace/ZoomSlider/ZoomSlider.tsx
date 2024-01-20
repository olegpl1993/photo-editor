import { Slider } from "@mui/material";
import styles from "./ZoomSlider.module.css";

interface Props {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  isScaleOpen: boolean;
}

function ZoomSlider(props: Props) {
  const { zoom, setZoom, isScaleOpen } = props;

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary-color");

  const handleSetZoom = (_event: Event, newValue: number | number[]) => {
    setZoom((newValue as number) / 100);
  };

  const zoomPercent = Math.round(zoom * 100);

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
          color: primaryColor,
          "& .MuiSlider-thumb": { color: primaryColor },
        }}
      />
      <p className={styles.value}>{zoomPercent}% </p>
    </div>
  );
}

export default ZoomSlider;
