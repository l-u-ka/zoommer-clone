import { useOrderHistoryProvider } from "@src/providers/OrderHistoryProvider/useOrderHistoryProvider";
import { privateAxios } from "@src/utils/privateAxios";
import { useState } from "react";

export function useRemoveOrder() {
    const [isRemoveLoading, setIsRemoveLoading] = useState(false);
    const {getOrders} = useOrderHistoryProvider();
    async function removeOrder(orderID:string) {
        try {
            setIsRemoveLoading(true);
            await privateAxios.delete(`/purchases/${orderID}`)
            getOrders();
        } catch (e) {
            console.error(e);
        } finally {
            setIsRemoveLoading(false);
        }
    }
    return {isRemoveLoading, removeOrder}
}