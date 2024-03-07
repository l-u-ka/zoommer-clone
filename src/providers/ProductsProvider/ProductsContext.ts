import { createContext } from "react";
import { CategoryType } from "@src/@types/types";

interface TProductsContext {
  categories: CategoryType[];
  categoriesLoading: boolean;
}

export const ProductsContext = createContext<TProductsContext>({
  categories: [],
  categoriesLoading: false
});
