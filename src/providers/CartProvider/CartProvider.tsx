import { PropsWithChildren, useState } from "react";
import { CartContext } from "./CartContext";
import { CartITem } from "@src/@types/types";

export function CartProvider({children} : PropsWithChildren) {

    const [cartItems, setCartItems] = useState<CartITem[]>([]);

    return (
        <CartContext.Provider value={{cartItems, setCartItems}}>
            {children}
        </CartContext.Provider>
    )
}