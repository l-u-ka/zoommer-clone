import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

export function useProductsProvider() {
    const {...data} = useContext(ProductsContext);
    return {...data};
}