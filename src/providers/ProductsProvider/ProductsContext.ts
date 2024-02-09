import { createContext } from "react";
import { ProductType, CategoryType } from "@src/@types/types";

interface TProductsContext {
  categories: CategoryType[];
  // searchedProducts: ProductType[];
  // searchProducts: (searchValue: string) => Promise<void>;
  // setSearchedProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  // searchLoading: boolean;
}

export const ProductsContext = createContext<TProductsContext>({
  categories: [],
  // searchedProducts: [],
  // setSearchedProducts: ()=> {},
  // searchProducts: async () => {},
  // searchLoading: false
});
