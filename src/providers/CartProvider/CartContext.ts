import { CartITem } from "@src/@types/types"
import { createContext } from "react"

interface CartContext {
    cartItems: CartITem[];
    cartLoading: boolean;
    getCartItems:() => Promise<void>;
}

export const CartContext = createContext<CartContext>({
    cartItems: [],
    cartLoading: false,
    getCartItems: async () => {}
})