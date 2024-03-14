import { createContext } from "react";
import { ProductCategory } from "@src/@types/types";

interface ProductsContext {
  categories: ProductCategory[];
  categoriesLoading: boolean;
}

export const ProductsContext = createContext<ProductsContext>({
  categories: [],
  categoriesLoading: false,
});
