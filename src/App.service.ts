import Konva from "konva";
import { Filters } from "./types";
import { Filter } from "konva/lib/Node";

export function createFiltersArr(filters: Filters) {
  const filtersArr: Filter[] = [];
  if (filters.blur) filtersArr.push(Konva.Filters.Blur);
  if (filters.brighten) filtersArr.push(Konva.Filters.Brighten);
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
