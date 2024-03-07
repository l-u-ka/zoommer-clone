import { useContext } from "react";
import { PurchaseContext } from "./PurchaseContext";

export function usePurchaseProvider() {
    const {...data} = useContext(PurchaseContext);
    return {...data};
}