import { useEffect } from "react";
import styles from "./Workspace.module.css";
import { Filters } from "../types";

interface Props {
  filters: Filters;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imageRef: React.RefObject<HTMLImageElement>;
  file: File | null;
}

function Workspace(props: Props) {
  console.log("workspace");
  const { filters, canvasRef, imageRef, file } = props;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const image = imageRef.current!;
    image.src = file ? URL.createObjectURL(file) : "/dragon.jpg";

    image.onload = () => {
      context.filter = `
      grayscale(${filters.grayscale}%)
      invert(${filters.invert}%)
      sepia(${filters.sepia}%)`;

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    return () => {
      URL.revokeObjectURL(image.src);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, file]);

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
