import { WishlistItemType } from "@src/@types/types";
import { createContext } from "react";

interface WishlistContextType {
    wishlistItems: WishlistItemType[];
    getWishlistItems: () => Promise<void>;
    wishlistLoading: boolean;
}

export const WishlistContext = createContext<WishlistContextType>({
    wishlistItems: [],
    getWishlistItems: async () => {},
    wishlistLoading: false
})