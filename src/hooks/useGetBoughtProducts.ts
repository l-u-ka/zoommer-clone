import { BoughtProduct } from "@src/@types/types";
import { privateAxios } from "@src/utils/privateAxios";
import { useEffect, useState } from "react";

export function useGetBoughtProducts() {
  const [boughtProducts, setBoughtProducts] = useState<BoughtProduct[]>([]);
  const [boughtProductsLoading, setBoughtProductsLoading] =
    useState<boolean>(false);

  async function getBoughtProducts() {
    try {
      setBoughtProductsLoading(true);
      const response = await privateAxios.get("/purchases");
      setBoughtProducts(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setBoughtProductsLoading(false);
    }
  }

  useEffect(() => {
    getBoughtProducts();
  }, []);

  return { boughtProducts, boughtProductsLoading };
}
