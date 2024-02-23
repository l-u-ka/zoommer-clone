import { privateAxios } from "@src/utils/privateAxios";
import { useEffect, useState } from "react";

interface BoughtProductType {
    id: string;
    created_at: string;
    updated_at: string;
    totalPrice: number;
    totalItems: number;
}

export function useGetBoughtProducts() {
    const [boughtProducts, setBoughtProducts] = useState<BoughtProductType[]>([]);
    const [boughtProductsLoading, setBoughtProductsLoading]= useState<boolean>(false);

    async function getBoughtProducts() {
        try {
            setBoughtProductsLoading(true);
            const response = await privateAxios.get("/purchases");
            setBoughtProducts(response.data)
        } catch (err) {
            console.error(err);
        } finally {
            setBoughtProductsLoading(false);
        }
    }

    useEffect(()=> {
        getBoughtProducts();
    }, [])

    return {boughtProducts, boughtProductsLoading}
}