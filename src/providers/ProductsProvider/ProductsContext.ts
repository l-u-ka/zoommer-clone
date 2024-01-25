import { createContext } from "react";
import { TCategory } from "@src/@types/types";

interface TProductsContext {
    categories: TCategory[];
    selectedCategory: TCategory | undefined;
    setSelectedCategory: React.Dispatch<React.SetStateAction<TCategory | undefined>>;
}

export const ProductsContext = createContext<TProductsContext>({
    categories: [],
    selectedCategory: undefined,
    setSelectedCategory: ()=>{}
})