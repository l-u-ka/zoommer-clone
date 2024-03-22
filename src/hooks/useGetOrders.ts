import { BoughtProduct } from "@src/@types/types";
import { privateAxios } from "@src/utils/privateAxios";
import { useEffect, useState } from "react";

export function useGetOrders() {
  const [orders, setOrders] = useState<BoughtProduct[]>([]);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false);

  async function getOrders() {
    try {
      setOrdersLoading(true);
      const response = await privateAxios.get("/purchases");
      setOrders(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return {orders, ordersLoading, getOrders};
}
