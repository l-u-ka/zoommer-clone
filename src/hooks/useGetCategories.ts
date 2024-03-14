import { useState } from "react";
import { useEffect } from "react";
import { ProductCategory } from "@src/@types/types";
import { publicAxios } from "@src/utils/publicAxios";

export default function useGetCategories() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);

  async function getCategories() {
    try {
      setCategoriesLoading(true);
      const data = await publicAxios.get("/product-category");
      setCategories(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setCategoriesLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, categoriesLoading };
}
