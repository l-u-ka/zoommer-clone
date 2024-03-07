import { createContext } from "react";

interface PurchaseContextType {
    totalPurchasePrice: number; 
    setTotalPurchasePrice: React.Dispatch<React.SetStateAction<number>>;
    totalPurchaseAmount: number;
    setTotalPurchaseAmount: React.Dispatch<React.SetStateAction<number>>;
    isBuyingFromCart: boolean; 
    setIsBuyingFromCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PurchaseContext = createContext<PurchaseContextType>({
    totalPurchasePrice: 0, 
    setTotalPurchasePrice: ()=>{},
    totalPurchaseAmount: 0,
    setTotalPurchaseAmount: ()=>{},
    isBuyingFromCart: false, 
    setIsBuyingFromCart: () => {}
})