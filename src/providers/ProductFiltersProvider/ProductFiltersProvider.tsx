import { PropsWithChildren, useState } from "react";
import { ProductFiltersContext } from "./ProductFiltersContext";

export function ProductFiltersProvider({children}: PropsWithChildren) {

    const defaultMinPrice:number = 0;
    const defaultMaxPrice:number = 12000;

    const [pageSize, setPageSize] = useState<number>(12);
    const [minPrice, setMinPrice] = useState<number>(defaultMinPrice);
    const [maxPrice, setMaxPrice] = useState<number>(defaultMaxPrice);
    const [isForSale, setIsForSale] = useState<boolean>(false);
    
    return (
        <ProductFiltersContext.Provider value={{pageSize, setPageSize, minPrice, setMinPrice, maxPrice, setMaxPrice, isForSale, setIsForSale, defaultMinPrice, defaultMaxPrice}}>
            {children}
        </ProductFiltersContext.Provider>
    )
}