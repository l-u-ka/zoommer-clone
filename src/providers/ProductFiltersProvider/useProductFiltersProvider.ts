import { useContext } from "react";
import { ProductFiltersContext } from "./ProductFiltersContext";

export function useProductFiltersProvider() {
  const { ...data } = useContext(ProductFiltersContext);
  return { ...data };
}
