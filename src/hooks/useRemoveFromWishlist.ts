import { useWishlistProvider } from "@src/providers/WishlistProvider/useWishlistProvider";
import { privateAxios } from "@src/utils/privateAxios";
import { useState } from "react";

export function useRemoveFromWishlist() {
    const {getWishlistItems} = useWishlistProvider()
    const [removeLoading, setRemoveLoading] = useState<boolean>(false);

    async function removeFromWishlist(id:string) {
        try {
            setRemoveLoading(true);
            await privateAxios.delete(`/liked-products/${id}`);
            getWishlistItems();
        } catch (error) {
            console.error(error);
        } finally {
            setRemoveLoading(false);
        }
    }
    return {removeFromWishlist, removeLoading}
}