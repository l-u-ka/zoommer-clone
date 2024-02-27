import ProductCard from "@src/components/ProductCard/ProductCard";
import { useWishlistProvider } from "@src/providers/WishlistProvider/useWishlistProvider"
import { FormattedMessage } from "react-intl";

export default function Wishlist() {

    const {wishlistItems} = useWishlistProvider();

    return (
        <div>
            {/* <h2 className="mb-10 firago-semibold text-lg leading-[22px] dark:text-white-400"><FormattedMessage id="wishlist"/></h2> */}
            {wishlistItems?.length < 1 && <div className="firago-medium text-black-main dark:text-dark-black-main text-base leading-[20px]"><FormattedMessage id="no.product.in.list"/></div>}
            {wishlistItems?.length >= 1 && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {wishlistItems?.map(item => {
                            return <ProductCard product={item.likedProduct}/>
                        })}
                    </div>)}
        </div>
    )
}
