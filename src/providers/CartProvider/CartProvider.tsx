import { PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import { useGetCartItems } from "@src/hooks/useGetCartItems";

export function CartProvider({children} : PropsWithChildren) {

    const {cartItems, cartLoading, getCartItems} = useGetCartItems();

    return (
        <CartContext.Provider value={{cartItems, cartLoading, getCartItems}}>
            {children}
        </CartContext.Provider>
    )
}