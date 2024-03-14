import { CartITem } from "@src/@types/types";
import { AuthStageEnum } from "@src/providers/AuthProvider/AuthContext";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { privateAxios } from "@src/utils/privateAxios";
import { useEffect, useState } from "react";

export function useGetCartItems() {
  const [cartItems, setCartItems] = useState<CartITem[]>([]);
  const [cartLoading, setCartLoading] = useState<boolean>(false);
  const { authStage } = useAuthProvider();

  async function getCartItems() {
    try {
      setCartLoading(true);
      const result = await privateAxios.get("/cart");
      setCartItems(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setCartLoading(false);
    }
  }

  useEffect(() => {
    if (authStage === AuthStageEnum.AUTHORIZED) {
      getCartItems();
    } else setCartItems([]);
  }, [authStage]);

  return { cartItems, getCartItems, cartLoading };
}
