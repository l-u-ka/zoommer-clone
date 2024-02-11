import { privateAxios } from "@src/utils/privateAxios";
import { useState } from "react";
import { useCartProvider } from "@src/providers/CartProvider/useCartProvider";

export function useAddToCart() {
  const {getCartItems} = useCartProvider();
  const [addToCartLoading, setAddToCartLoading] = useState<boolean>(false);

  async function addToCart(id: string) {
    try {
      setAddToCartLoading(true);
      await privateAxios.post("/cart", {
        product_id: id,
      });
      getCartItems();
    } catch (e) {
      console.error(e);
    } finally {
      setAddToCartLoading(false);
    }
  }

  return { addToCartLoading, addToCart };
}
