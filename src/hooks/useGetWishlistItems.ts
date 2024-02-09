import { WishlistItemType } from "@src/@types/types";
import { privateAxios } from "@src/utils/privateAxios";
import { useEffect, useState } from "react";

export function useGetWishlistItems() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>([]);
    const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);

    async function getWishlistItems() {
        try {
            setWishlistLoading(true);
            const response = await privateAxios.get("/liked-products")
            setWishlistItems(response.data)
        } catch(e) {
            console.error(e);
        } finally {
            setWishlistLoading(false);
        }
    }

    // useEffect(()=> {
    //    if(userData) getWishlistItems();
    // }, [userData])

    return {wishlistItems, getWishlistItems, wishlistLoading}
}