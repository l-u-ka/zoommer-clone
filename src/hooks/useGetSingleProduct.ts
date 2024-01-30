import { ProductType } from "@src/@types/types";
import { publicAxios } from "@src/utils/publicAxios";
import { useEffect, useState } from "react";

export default function useGetSingleProduct({productId} : {productId: string}) {

    const [product, setProduct] = useState<ProductType>();
    const [singleProductLoading, setSingleProductLoading] = useState<boolean>(false);

    async function getProduct(productId:String) {
        try {
            setSingleProductLoading(true);
            const response = await publicAxios.get(`/product/${productId}`);
            setProduct(response.data);
        } catch(e) {
            console.error(e);
        } finally {
            setSingleProductLoading(false);
        }
    }

    useEffect(()=> {
        getProduct(productId);
    }, [])

    return {product, singleProductLoading}
}