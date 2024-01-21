import { CartITem } from "@src/@types/types"
import { createContext } from "react"

interface TCartContext {
    cartItems: CartITem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartITem[]>>
}

export const CartContext = createContext<TCartContext>({
    cartItems: [],
    setCartItems: ()=> {},
})