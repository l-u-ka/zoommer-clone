import { WishlistItemType } from "@src/@types/types";
import { Auth_Stage_Enum } from "@src/providers/AuthProvider/AuthContext";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { privateAxios } from "@src/utils/privateAxios";
import { useEffect, useState } from "react";

export function useGetWishlistItems() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>([]);
    const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);
    const {authStage} = useAuthProvider();

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


    useEffect(()=> {
        if(authStage === Auth_Stage_Enum.AUTHORIZED) getWishlistItems();
    }, [authStage])

    return {wishlistItems, getWishlistItems, wishlistLoading}
}