import { createContext } from "react";

interface ProductFiltersContextType {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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

export const ProductFiltersContext = createContext<ProductFiltersContextType>({
  currentPage: 1,
  setCurrentPage: () => {},
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
