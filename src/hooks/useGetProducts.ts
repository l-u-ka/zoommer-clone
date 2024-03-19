import { Product } from "@src/@types/types";
import { publicAxios } from "@src/utils/publicAxios";
import { useEffect, useState } from "react";

export interface GetProductsParams {
  productName?: string;
  categoryName?: string;
  page?: number | null;
  pageSize?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  onlySales?: boolean;
}

export default function useGetProducts(productProps: GetProductsParams) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [totalProducts, setTotalProducts] = useState<number>();

  async function getProducts(params: GetProductsParams) {
    try {
      setProductsLoading(true);
      const response = await publicAxios.get(`/product`, { params: params });
      setProducts(response.data.products.sort((a:Product, b:Product) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())); // reverse so that most recent products are at the beginning of array
      setTotalProducts(response.data.total);
    } catch (e) {
      console.error(e);
    } finally {
      setProductsLoading(false);
    }
  }

  useEffect(() => {
    getProducts(productProps);
  }, Object.values(productProps)); // Only re-run the effect if categoryName changes

  return { products, productsLoading, totalProducts, setProducts };
}
