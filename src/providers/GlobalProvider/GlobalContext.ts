import { CartITem, ProductType } from "@src/@types/types";
import { createContext } from "react";

interface TGlobalContext {
  showOverlay: boolean;
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  loginModalOpen: boolean;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  totalPurchasePrice: number; 
  setTotalPurchasePrice: React.Dispatch<React.SetStateAction<number>>;
  totalPurchaseAmount: number;
  setTotalPurchaseAmount: React.Dispatch<React.SetStateAction<number>>;
  isBuyingFromCart: boolean; 
  setIsBuyingFromCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<TGlobalContext>({
    showOverlay: false,
    setShowOverlay: ()=> {},
    loginModalOpen: false,
    setLoginModalOpen: ()=> {},
    totalPurchasePrice: 0, 
    setTotalPurchasePrice: ()=>{},
    totalPurchaseAmount: 0,
    setTotalPurchaseAmount: ()=>{},
    isBuyingFromCart: false, 
    setIsBuyingFromCart: () => {}
});
