import { PropsWithChildren, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import useGetCategories from "@src/hooks/useGetCategories";


export function ProductsProvider({children}: PropsWithChildren) {

    const {categories, categoriesLoading} = useGetCategories();
    
    return (
        <ProductsContext.Provider value={{categories, categoriesLoading}}>{children}</ProductsContext.Provider>
    )
}