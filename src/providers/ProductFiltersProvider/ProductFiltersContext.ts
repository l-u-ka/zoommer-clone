import { createContext } from "react";

interface ProductFiltersContext {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  defaultMinPrice: number;
  defaultMaxPrice: number;
}

export const ProductFiltersContext = createContext<ProductFiltersContext>({
  pageSize: 12,
  setPageSize: () => {},
  defaultMinPrice: 0,
  defaultMaxPrice: 5000
});
