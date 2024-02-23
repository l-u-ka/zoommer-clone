import { PropsWithChildren, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { CartITem, ProductType } from "@src/@types/types";

export function GlobalProvider({ children }: PropsWithChildren) {

  // const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGE_ENUM>(LANGUAGE_ENUM.GEO);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState<number>(JSON.parse((localStorage.getItem("purchasePrice")) as string) || 0);
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState<number>(JSON.parse((localStorage.getItem("purchaseAmount")) as string) || 0);
  const [isBuyingFromCart, setIsBuyingFromCart] = useState<boolean>( JSON.parse(localStorage.getItem('isBuyingFromCart') as string) || false);
  console.log("IS BUYING FROM CART?: ", isBuyingFromCart)

  return (
    <GlobalContext.Provider value={{showOverlay, setShowOverlay, loginModalOpen, setLoginModalOpen, totalPurchasePrice, setTotalPurchasePrice, totalPurchaseAmount, setTotalPurchaseAmount, isBuyingFromCart, setIsBuyingFromCart}}>
      {children}
    </GlobalContext.Provider>
  );
}
