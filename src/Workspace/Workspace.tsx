import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import styles from "./Workspace.module.css";
import { Filters } from "../types";

interface Props {
  filters: Filters;
}

interface Ref {
  saveCanvasImage: () => void;
}

const Workspace = forwardRef<Ref, Props>((props, ref) => {
  const { filters } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  const saveCanvasImage = () => {
    const canvas = canvasRef.current!;
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "filtered_image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useImperativeHandle(
    ref,
    () => ({
      saveCanvasImage,
    }),
    []
  );

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
});

export default Workspace;
