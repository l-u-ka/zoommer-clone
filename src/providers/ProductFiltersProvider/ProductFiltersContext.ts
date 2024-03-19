import { createContext } from "react";

interface ProductFiltersContext {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  isForSale: boolean;
  setIsForSale: React.Dispatch<React.SetStateAction<boolean>>;
  defaultMinPrice: number;
  defaultMaxPrice: number;
}

export const ProductFiltersContext = createContext<ProductFiltersContext>({
  pageSize: 12,
  setPageSize: () => {},
  minPrice: 0,
  setMinPrice: () => {},
  maxPrice: 5000,
  setMaxPrice: () => {},
  isForSale: false,
  setIsForSale: () => {},
  defaultMinPrice: 0,
  defaultMaxPrice: 5000
});
