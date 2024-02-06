import { PropsWithChildren, useState } from "react";
import { ProductFiltersContext } from "./ProductFiltersContext";

export function ProductFiltersProvider({children}: PropsWithChildren) {

    const defaultMinPrice:number = 0;
    const defaultMaxPrice:number = 5000;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const [minPrice, setMinPrice] = useState<number>(defaultMinPrice);
    const [maxPrice, setMaxPrice] = useState<number>(defaultMaxPrice);
    const [isForSale, setIsForSale] = useState<boolean>(false);
    
    return (
        <ProductFiltersContext.Provider value={{currentPage, setCurrentPage, pageSize, setPageSize, minPrice, setMinPrice, maxPrice, setMaxPrice, isForSale, setIsForSale, defaultMinPrice, defaultMaxPrice}}>
            {children}
        </ProductFiltersContext.Provider>
    )
}