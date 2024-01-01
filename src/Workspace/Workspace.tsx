import { useEffect, useRef } from "react";
import styles from "./Workspace.module.css";
import { Filters } from "../Types";

interface Props {
  filters: Filters;
}

function Workspace(props: Props) {
  const { filters } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    const image = new Image();
    image.src = "/dragon.jpg";

    image.onload = () => {
      context.filter = `
      grayscale(${filters.grayscale}%)
      invert(${filters.invert}%)
      sepia(${filters.sepia}%)`;

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [filters]);

  return (
    <div className={styles.workspace}>
      <canvas
        ref={canvasRef}
        id="canvas"
        width="800"
        height="600"
        style={{ border: "1px solid black" }}
      ></canvas>
    </div>
  );
}

export default Workspace;
