import Konva from "konva";

export const saveCanvas = (
  file: File | null,
  stageRef: React.RefObject<Konva.Stage>,
  format: "png" | "jpeg",
  quality: number
) => {
  const downloadLink = document.createElement("a");
  const fileName = file?.name.split(".")[0];

  if (stageRef.current && format === "png") {
    const dataURL = stageRef.current.toDataURL({
      mimeType: "image/png",
      quality,
    });
    downloadLink.href = dataURL || "";
    downloadLink.download = fileName ? `${fileName}.png` : "photo-editor.png";
  }

  if (stageRef.current && format === "jpeg") {
    const dataURL = stageRef.current.toDataURL({
      mimeType: "image/jpeg",
      quality,
    });
    downloadLink.href = dataURL || "";
    downloadLink.download = fileName ? `${fileName}.jpeg` : "photo-editor.jpeg";
  }

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
