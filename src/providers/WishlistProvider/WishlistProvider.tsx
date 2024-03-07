import { PropsWithChildren} from "react";
import { WishlistContext } from "./WishlistContext";
import { useGetWishlistItems } from "@src/hooks/useGetWishlistItems";

export function WishlistProvider({children} : PropsWithChildren) {

    const {wishlistItems, getWishlistItems, wishlistLoading} = useGetWishlistItems();

    return <WishlistContext.Provider value={{getWishlistItems, wishlistItems, wishlistLoading}}>{children}</WishlistContext.Provider>
}