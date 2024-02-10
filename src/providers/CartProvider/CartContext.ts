import { CartITem } from "@src/@types/types"
import { createContext } from "react"

interface TCartContext {
    cartItems: CartITem[];
    cartLoading: boolean;
    getCartItems:() => Promise<void>;
}

export const CartContext = createContext<TCartContext>({
    cartItems: [],
    cartLoading: false,
    getCartItems: async () => {}
})