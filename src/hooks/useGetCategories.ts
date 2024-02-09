import { useState } from "react";
import { useEffect } from "react";
import { CategoryType } from "@src/@types/types";
import { publicAxios } from "@src/utils/publicAxios";

export default function useGetCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  async function getCategories() {
    try {
      const data = await publicAxios.get("/product-category");
      setCategories(data.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  // console.log(categories)

  return { categories };
}
