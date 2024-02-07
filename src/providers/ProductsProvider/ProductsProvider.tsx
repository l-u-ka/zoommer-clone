import { PropsWithChildren, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import useGetCategories from "@src/hooks/useGetCategories";
import useSearchProducts from "@src/hooks/useSearchProducts";


export function ProductsProvider({children}: PropsWithChildren) {

    const {categories} = useGetCategories();
    // const {searchedProducts, searchProducts, searchLoading, setSearchedProducts} = useSearchProducts();
    
    return (
        <ProductsContext.Provider value={{categories /*, searchedProducts, searchProducts, searchLoading, setSearchedProducts*/}}>{children}</ProductsContext.Provider>
    )
}