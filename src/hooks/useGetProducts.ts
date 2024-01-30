import { ProductType } from "@src/@types/types";
import { publicAxios } from "@src/utils/publicAxios";
import { useEffect, useState } from "react";

export default function useGetProducts({categoryName}:{categoryName: string}) {

    const [products, setProducts] = useState<ProductType[]>([]);
    const [productsLoading, setProductsLoading] = useState<boolean>(false);

    async function getProducts({categoryName}:{categoryName: string}) {
        try {
            setProductsLoading(true);
            const response = await publicAxios.get(`/product?categoryName=${categoryName}`);
            setProducts(response.data.products);
        } catch(e) {
            console.error(e);
        }
        finally {
            setProductsLoading(false);
        }
    }

    useEffect(()=> {
        getProducts({categoryName});
    }, [])

    return {products, productsLoading};
}