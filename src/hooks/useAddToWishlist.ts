import { useWishlistProvider } from "@src/providers/WishlistProvider/useWishlistProvider";
import { privateAxios } from "@src/utils/privateAxios";
import { useState } from "react";

export function useAddToWishlist() {
    const {getWishlistItems} = useWishlistProvider();
    const [addLoading, setAddLoading] = useState<boolean>(false);

    async function addToWishlist(id: string) {
        try {
            setAddLoading(true);
            await privateAxios.post('liked-products', {product_id: id})
            getWishlistItems();
        } catch (error) {
            console.error(error);
        } finally {
            setAddLoading(false);
        }
    }

   return {addToWishlist, addLoading};
}