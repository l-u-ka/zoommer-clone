import { PropsWithChildren, useEffect } from "react";
import { CartContext } from "./CartContext";
import { useGetCartItems } from "@src/hooks/useGetCartItems";

export function CartProvider({children} : PropsWithChildren) {

    const {cartItems, cartLoading, getCartItems} = useGetCartItems();
    console.log("CART ITEMS ARE :", cartItems)

    // useEffect(()=> {
    //     console.log("cart items", cartItems)
    // }, [cartItems])

    return (
        <CartContext.Provider value={{cartItems, cartLoading, getCartItems}}>
            {children}
        </CartContext.Provider>
    )
}