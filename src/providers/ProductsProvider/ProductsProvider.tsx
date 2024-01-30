import { PropsWithChildren, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import useGetCategories from "@src/hooks/useGetCategories";
import { TCategory } from "@src/@types/types";
import useGetProducts from "@src/hooks/useGetProducts";

export function ProductsProvider({children}: PropsWithChildren) {

    const {categories} = useGetCategories();
    
    return (
        <ProductsContext.Provider value={{categories}}>{children}</ProductsContext.Provider>
    )
}