import { PropsWithChildren, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import useGetCategories from "@src/hooks/useGetCategories";
import { TCategory } from "@src/@types/types";

export function ProductsProvider({children}: PropsWithChildren) {

    const {categories} = useGetCategories();
    const [selectedCategory, setSelectedCategory] = useState<TCategory>();
    console.log("SELECTED CATEGORY:", selectedCategory)

    return (
        <ProductsContext.Provider value={{categories, selectedCategory, setSelectedCategory}}>{children}</ProductsContext.Provider>
    )
}