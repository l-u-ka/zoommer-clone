import { privateAxios } from "@src/utils/privateAxios";
import { useState } from "react";

export function useBuyProduct() {

    const [buyLoading, setBuyLoading] = useState<boolean>(false);
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

    async function buyProduct(totalPrice: number, totalItems: number) {
        try {
            setIsSuccessful(false);
            setBuyLoading(true);
            await privateAxios.post("/purchases", {totalPrice, totalItems})
            setIsSuccessful(true);
        } catch (err) {
            console.error(err);
        } finally {
            setBuyLoading(false);
        }
    }

    return {buyProduct, buyLoading, isSuccessful}
}