import { Slider } from "@mui/material";
import styles from "./ScaleSlider.module.css";

interface Props {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}

function ScaleSlider(props: Props) {
  const { scale, setScale } = props;

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--primary-color");

  const handleSetScale = (_event: Event, newValue: number | number[]) => {
    setScale((newValue as number) / 100);
  };

  const scalePercent = Math.round(scale * 100);

  return (
    <div className={styles.scaleSlider}>
      <Slider
        min={10}
        max={150}
        name="scale"
        value={scalePercent}
        onChange={handleSetScale}
        sx={{
          width: "100px",
          color: primaryColor,
          "& .MuiSlider-thumb": { color: primaryColor },
        }}
      />
      <p className={styles.value}>{scalePercent}% </p>
    </div>
  );
}

export default ScaleSlider;
