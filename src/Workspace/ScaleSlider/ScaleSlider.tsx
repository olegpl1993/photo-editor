import styles from "./ScaleSlider.module.css";

interface Props {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}

function ScaleSlider(props: Props) {
  const { scale, setScale } = props;

  const handleSetScale = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseInt(event.target.value) / 100);
  };

  const scalePercent = Math.round(scale * 100);

  return (
    <div className={styles.scaleSlider}>
      <input
        type="range"
        min="10"
        max="150"
        name="scale"
        value={scalePercent}
        onChange={handleSetScale}
        className={styles.input}
      />
      <p className={styles.value}>{scalePercent}% </p>
    </div>
  );
}

export default ScaleSlider;
