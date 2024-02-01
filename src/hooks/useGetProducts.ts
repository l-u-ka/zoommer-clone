import { ProductType } from "@src/@types/types";
import { publicAxios } from "@src/utils/publicAxios";
import { useEffect, useState } from "react";

interface GetProductsParams {
  productName?: string;
  categoryName?: string;
  page?: number | null;
  pageSize?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}

export default function useGetProducts(productProps: GetProductsParams) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  async function getProducts(params: GetProductsParams) {
    try {
      setProductsLoading(true);
      const response = await publicAxios.get(`/product`, { params });
      setProducts(response.data.products);
    } catch (e) {
      console.error(e);
    } finally {
      setProductsLoading(false);
    }
  }

  useEffect(() => {
    getProducts(productProps);
  }, Object.values(productProps)); // Only re-run the effect if categoryName changes

  return { products, productsLoading };
}
