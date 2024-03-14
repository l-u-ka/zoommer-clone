import { WishlistItem } from "@src/@types/types";
import { createContext } from "react";

interface WishlistContext {
  wishlistItems: WishlistItem[];
  getWishlistItems: () => Promise<void>;
  wishlistLoading: boolean;
}

export const WishlistContext = createContext<WishlistContext>({
  wishlistItems: [],
  getWishlistItems: async () => {},
  wishlistLoading: false,
});
