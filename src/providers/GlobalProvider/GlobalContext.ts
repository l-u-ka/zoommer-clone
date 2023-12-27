import { CartITem } from "@src/@types/types";
import { createContext } from "react";

interface TGlobalContext {
  cartItems: CartITem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartITem[]>>
}

export const GlobalContext = createContext<TGlobalContext>({
    cartItems: [],
    setCartItems: ()=> {},
});
