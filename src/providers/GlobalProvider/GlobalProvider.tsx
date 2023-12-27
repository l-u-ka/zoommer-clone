import { PropsWithChildren, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { CartITem } from "@src/@types/types";

export function GlobalProvider({ children }: PropsWithChildren) {

  // const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGE_ENUM>(LANGUAGE_ENUM.GEO);
  const [cartItems, setCartItems] = useState<CartITem[]>([]);
  
  return (
    <GlobalContext.Provider value={{cartItems, setCartItems}}>
      {children}
    </GlobalContext.Provider>
  );
}
