import { PropsWithChildren} from "react";
import { OrderHistoryContext } from "./OrderHistoryContext";
import { useGetOrders } from "@src/hooks/useGetOrders";


export function OrderHistoryProvider({children}: PropsWithChildren) {
    const {orders, ordersLoading, getOrders} = useGetOrders();

    return <OrderHistoryContext.Provider value={{orders, ordersLoading, getOrders}}>{children}</OrderHistoryContext.Provider>
}