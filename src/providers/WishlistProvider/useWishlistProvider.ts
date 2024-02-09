import { useContext } from "react";
import { WishlistContext } from "./WishlistContext";

export function useWishlistProvider() {
    const {...values} = useContext(WishlistContext);
    return {...values};
}