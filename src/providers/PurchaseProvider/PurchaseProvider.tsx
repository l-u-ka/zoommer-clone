import { PropsWithChildren, useState } from "react";
import { PurchaseContext } from "./PurchaseContext";

export function PurchaseProvider({children} : PropsWithChildren) {
    const [totalPurchasePrice, setTotalPurchasePrice] = useState<number>(JSON.parse((localStorage.getItem("purchasePrice")) as string) || 0);
    const [totalPurchaseAmount, setTotalPurchaseAmount] = useState<number>(JSON.parse((localStorage.getItem("purchaseAmount")) as string) || 0);
    // const [isBuyingFromCart, setIsBuyingFromCart] = useState<boolean>( JSON.parse(localStorage.getItem('isBuyingFromCart') as string) || false);

    return <PurchaseContext.Provider value={{totalPurchasePrice, setTotalPurchasePrice, totalPurchaseAmount, setTotalPurchaseAmount, /*isBuyingFromCart, setIsBuyingFromCart*/}}>{children}</PurchaseContext.Provider>
}