import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./Workspace.module.css";
import { Filters } from "../types";

interface Props {
  filters: Filters;
}

export interface WorkspaceRef {
  saveCanvasImage: () => void;
  loadUserImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Workspace = forwardRef<WorkspaceRef, Props>((props, ref) => {
  const { filters } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef(new Image());
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    const image = imageRef.current;
    image.src = file ? URL.createObjectURL(file) : "/dragon.jpg";

    image.onload = () => {
      context.filter = `
      grayscale(${filters.grayscale}%)
      invert(${filters.invert}%)
      sepia(${filters.sepia}%)`;

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [filters, file]);

  useImperativeHandle(
    ref,
    () => ({
      saveCanvasImage,
      loadUserImage,
    }),
    []
  );

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

  const loadUserImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFile(file);
  };

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
