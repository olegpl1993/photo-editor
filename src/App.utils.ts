import Konva from "konva";
import { Filters } from "./types";
import { Filter } from "konva/lib/Node";

export function createFiltersArr(filters: Filters) {
  const filtersArr: Filter[] = [];
  if (filters.blur) filtersArr.push(Konva.Filters.Blur);
  if (filters.brighten) filtersArr.push(Konva.Filters.Brighten);
  if (filters.contrast) filtersArr.push(Konva.Filters.Contrast);
  if (filters.grayscale) filtersArr.push(Konva.Filters.Grayscale);
  if (filters.invert) filtersArr.push(Konva.Filters.Invert);
  if (filters.noise) filtersArr.push(Konva.Filters.Noise);
  if (filters.pixelate > 1) filtersArr.push(Konva.Filters.Pixelate);
  if (filters.posterize) filtersArr.push(Konva.Filters.Posterize);
  if (filters.sepia) filtersArr.push(Konva.Filters.Sepia);
  if (filters.solarize) filtersArr.push(Konva.Filters.Solarize);
  if (filters.threshold) filtersArr.push(Konva.Filters.Threshold);
  if (filters.alpha) filtersArr.push(Konva.Filters.RGBA);
  if (filters.hue || filters.saturation || filters.luminance) {
    filtersArr.push(Konva.Filters.HSL);
  }
  return filtersArr;
}

export const loadImg = (
  setFile: React.Dispatch<React.SetStateAction<File | null>>
) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.style.display = "none";

  const changeLoadEvent = (event: Event) => {
    const loadEvent = event as unknown as React.ChangeEvent<HTMLInputElement>;
    const file = loadEvent.target?.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  input.addEventListener("change", changeLoadEvent);
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
};
