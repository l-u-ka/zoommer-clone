import { PropsWithChildren, useState } from "react";
import { CartContext } from "./CartContext";
import { useGetCartItems } from "@src/hooks/useGetCartItems";

export function CartProvider({children} : PropsWithChildren) {

    const {cartItems, cartLoading, getCartItems} = useGetCartItems();

    console.log("CART ITEMS", cartItems)

    return (
        <CartContext.Provider value={{cartItems, cartLoading, getCartItems}}>
            {children}
        </CartContext.Provider>
    )
}