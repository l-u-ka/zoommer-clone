import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export function useGlobalProvider() {
  const { ...data } = useContext(GlobalContext);

  return { ...data };
}
