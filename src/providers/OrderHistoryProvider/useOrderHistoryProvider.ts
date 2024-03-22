import { useContext } from "react";
import { OrderHistoryContext } from "./OrderHistoryContext";

export function useOrderHistoryProvider() {
  const { ...data } = useContext(OrderHistoryContext);
  return { ...data };
}