import { ProfileMenuEnum } from "@src/@types/types";
import ProductCard from "@src/components/ProductCard/ProductCard";
import ProductCardSkeleton from "@src/components/Skeletons/ProductCardSkeleton/ProductCardSkeleton";
import { useWishlistProvider } from "@src/providers/WishlistProvider/useWishlistProvider"
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";


export default function Wishlist() {

    const {wishlistItems, wishlistLoading} = useWishlistProvider();
    const wishlistItemSkeletons:ReactNode[] = [];
    for (let i =0; i < 4; i++) wishlistItemSkeletons.push(<ProductCardSkeleton key={i}/>)

    return (
        <div>
            <h2 className="mb-[30px] firago-semibold text-lg leading-[22px] text-black-main dark:text-dark-black-main hidden lg:block"><FormattedMessage id={ProfileMenuEnum.ON_WISHLIST}/></h2>
            {wishlistLoading && <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{wishlistItemSkeletons}</div>}
            {(!wishlistLoading && wishlistItems?.length < 1) && <div className="firago-medium text-black-main dark:text-dark-black-main text-base leading-[20px]"><FormattedMessage id="no.product.in.list"/></div>}
            {(!wishlistLoading && wishlistItems?.length >= 1) && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10">
                        {wishlistItems?.map(item => {
                            return <ProductCard key={item.id} product={item.likedProduct}/>
                        })}
                    </div>)}
        </div>
    )
}
