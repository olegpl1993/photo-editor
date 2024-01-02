import { useEffect, useState } from "react";
import styles from "./Workspace.module.css";
import { Filters } from "../types";
import { Stage, Layer, Rect, Image } from "react-konva";

interface Props {
  filters: Filters;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  file: File | null;
}

function Workspace(props: Props) {
  console.log("workspace");
  const { filters, canvasRef, file } = props;
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const loadImage = () => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const image = new window.Image();
    image.src = file ? URL.createObjectURL(file) : "/dragon.jpg";
    image.onload = () => {
      setImage(image);
      context.filter = `
      grayscale(${filters.grayscale}%)
      invert(${filters.invert}%)
      sepia(${filters.sepia}%)`;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  };

  useEffect(() => {
    loadImage();
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
      <Stage width={800} height={600} style={{ border: "1px solid red" }}>
        <Layer>
          <Image
            image={image!}
            width={800}
            height={600}
            x={0}
            y={0}
            draggable
          />
          <Rect width={100} height={100} fill="blue" draggable />
          <Rect width={100} height={100} fill="red" x={200} y={200} draggable />
        </Layer>
      </Stage>
    </div>
  );
}

export default Workspace;
