import { WishlistItem } from "@src/@types/types";
import { AuthStageEnum } from "@src/providers/AuthProvider/AuthContext";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { privateAxios } from "@src/utils/privateAxios";
import { useEffect, useState } from "react";

export function useGetWishlistItems() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);
  const { authStage } = useAuthProvider();

  async function getWishlistItems() {
    try {
      setWishlistLoading(true);
      const response = await privateAxios.get("/liked-products");
      setWishlistItems(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setWishlistLoading(false);
    }
  }

  useEffect(() => {
    if (authStage === AuthStageEnum.AUTHORIZED) getWishlistItems();
  }, [authStage]);

  return { wishlistItems, getWishlistItems, wishlistLoading };
}
