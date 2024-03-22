import { BoughtProduct } from "@src/@types/types";
import { createContext } from "react";

interface OrderHistoryContext {
    orders: BoughtProduct[]; 
    ordersLoading: boolean; 
    getOrders: () => Promise<void>;
}

export const OrderHistoryContext = createContext<OrderHistoryContext>({
    orders: [],
    ordersLoading: false, 
    getOrders: async () => {}
})