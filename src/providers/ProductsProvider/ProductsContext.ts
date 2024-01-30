import { createContext } from "react";
import {TCategory } from "@src/@types/types";

interface TProductsContext {
    categories: TCategory[];
}

export const ProductsContext = createContext<TProductsContext>({
    categories: [],
})