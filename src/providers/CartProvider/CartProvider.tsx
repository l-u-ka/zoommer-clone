import { PropsWithChildren, useEffect } from "react";
import { CartContext } from "./CartContext";
import { useGetCartItems } from "@src/hooks/useGetCartItems";

export function CartProvider({children} : PropsWithChildren) {

    const {cartItems, cartLoading, getCartItems} = useGetCartItems();

    // console.log("CART ITEMS", cartItems)

    useEffect(()=> {
        console.log("changed", cartItems)
    }, [cartItems])

    return (
        <CartContext.Provider value={{cartItems, cartLoading, getCartItems}}>
            {children}
        </CartContext.Provider>
    )
}