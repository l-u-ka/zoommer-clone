import { Product } from "@src/@types/types";
import { publicAxios } from "@src/utils/publicAxios";
import { useState } from "react";

export default function useSearchProducts() {
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  async function searchProducts(searchValue: string) {
    try {
      setSearchLoading(true);
      const response = await publicAxios.get(
        `/product?productName=${searchValue}`
      );
      setSearchedProducts(response.data.products);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchLoading(false);
    }
  }

  return {
    searchedProducts,
    searchProducts,
    searchLoading,
    setSearchedProducts,
  };
}
