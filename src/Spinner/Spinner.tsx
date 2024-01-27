import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.cube}>
        <div className={`${styles.polygon} ${styles.top}`}>1</div>
        <div className={`${styles.polygon} ${styles.back}`}>2</div>
        <div className={`${styles.polygon} ${styles.left}`}>3</div>
        <div className={`${styles.polygon} ${styles.right}`}>4</div>
        <div className={`${styles.polygon} ${styles.front}`}>5</div>
        <div className={`${styles.polygon} ${styles.bottom}`}>6</div>
      </div>
    </div>
  );
};

export default Spinner;
