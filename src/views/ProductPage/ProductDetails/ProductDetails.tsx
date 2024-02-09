import { ProductType } from "@src/@types/types";
import AdditionalDetail from "./AdditionalDetail/AdditionalDetail";
import { FormattedMessage } from "react-intl";
import SimilarProducts from "./SimilarProducts/SimilarProducts";
import { useWishlistProvider } from "@src/providers/WishlistProvider/useWishlistProvider";
import { useAddToWishlist } from "@src/hooks/useAddToWishlist";
import { useRemoveFromWishlist } from "@src/hooks/useRemoveFromWishlist";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { Auth_Stage_Enum } from "@src/providers/AuthProvider/AuthContext";
import wishlistIcon from '@src/assets/icons/product-details-heart.png'
import wishlistIconActive from '@src/assets/icons/product-details-heart-active.png'

export default function ProductDetails({product} : {product: ProductType}) {
    // console.log("PRODUCT DETAILS: ", product)
    const {addToWishlist, addLoading} = useAddToWishlist();
    const {removeFromWishlist, removeLoading} = useRemoveFromWishlist();
    const {wishlistItems} = useWishlistProvider();
    const {authStage} = useAuthProvider();

    function removeItem(id: string) {
        const item = wishlistItems.find(item => item.likedProduct.id === id);
        // console.log(item?.id)
        // console.log(wishlistItems, id)
        if (item) removeFromWishlist(item.id)
    }

    function isInWishlist(id:string) {
        const result = wishlistItems.find(item => item.likedProduct.id === id);
        if (result) return true;
        else return false;
    }
   
    return (
        <div className="w-full">
            <div className="w-full lg:max-w-[450px] relative">
                <h3 className="firago-bold text-sm leading-[17px] mb-5 dark:text-orange-primary">{product?.title.charAt(0).toUpperCase() + product?.title.substring(1, product?.title.length)}</h3>
                <img src={product?.image} alt="product image" className="w-full h-[300px] object-contain"/>
                <div className={`${authStage === Auth_Stage_Enum.AUTHORIZED ? 'flex' : 'hidden'} w-7 h-7 bg-white-400 rounded-[50%] absolute top-10 right-4 items-center justify-center`}>
                    {(!addLoading && !removeLoading) && <img src={isInWishlist(product.id) ? wishlistIconActive : wishlistIcon} alt="wishlist icon" className="w-[18px] cursor-pointer" onClick={ () => isInWishlist(product.id) ? removeItem(product.id) : addToWishlist(product.id)}/>}
                    {(addLoading || removeLoading) && <div>loading...</div>}
                </div>
            </div>
            <hr className="mt-[30px] mb-[30px] border border-solid border-white-400"/>
            <SimilarProducts category={product.category_name} productId={product.id}/>
            <hr className="mt-[30px] mb-[30px] border border-solid border-white-400"/>
            <div>
                <h3 className="firago-semibold text-lg leading-5 mb-[24px]"><FormattedMessage id="additional.info"/></h3>
                <AdditionalDetail paragraph={<FormattedMessage id="description"/>} text={product?.description}/>
            </div>
            <hr className="mt-[30px] border border-solid border-white-400"/>
        </div>
    )
}
