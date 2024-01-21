import { useContext } from "react";
import { CartContext } from "./CartContext";

export function useCartProvider() {
    const {...data} = useContext(CartContext);
    return {...data};
}