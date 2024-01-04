import { useEffect, useState } from "react";
import styles from "./ScaleSlider.module.css";

interface Props {
  setScale: React.Dispatch<React.SetStateAction<number>>;
}

function ScaleSlider(props: Props) {
  const { setScale } = props;
  const [scalePercent, setScalePercent] = useState<string>("100");

  useEffect(() => {
    setScale(parseInt(scalePercent) / 100);
  });

  const handleSetScalePercent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setScalePercent(event.target.value);
  };

  return (
    <div className={styles.scaleSlider}>
      <input
        type="range"
        min="10"
        max="150"
        name="scale"
        value={scalePercent}
        onChange={handleSetScalePercent}
        className={styles.input}
      />
      <p className={styles.value}>{scalePercent}%</p>
    </div>
  );
}

export default ScaleSlider;
