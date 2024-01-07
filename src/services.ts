import Konva from "konva";
import { Filters } from "./types";
import { Filter } from "konva/lib/Node";

export function createFiltersArr(filters: Filters) {
  const filtersArr: Filter[] = [];
  if (filters.blur) filtersArr.push(Konva.Filters.Blur);
  if (filters.brighten) filtersArr.push(Konva.Filters.Brighten);
  return filtersArr;
}
