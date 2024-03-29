import { Product } from "@src/@types/types";
import { FormattedMessage } from "react-intl";
import { useMemo, useState } from "react";
import { useWishlistProvider } from "@src/providers/WishlistProvider/useWishlistProvider";
import { useAddToWishlist } from "@src/hooks/useAddToWishlist";
import { useRemoveFromWishlist } from "@src/hooks/useRemoveFromWishlist";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { AuthStageEnum } from "@src/providers/AuthProvider/AuthContext";
import wishlistIcon from '@src/assets/icons/product-details-heart.png'
import wishlistIconActive from '@src/assets/icons/product-details-heart-active.png'
import LoadingSpinner from "@src/components/LoadingSpinner/LoadingSpinner";
import ProductPhotoModal from "./ProductPhotoModal/ProductPhotoModal";
import AdditionalDetail from "./AdditionalDetail/AdditionalDetail";
import SimilarProducts from "./SimilarProducts/SimilarProducts";

export default function ProductDetails({product} : {product: Product}) {
    const {addToWishlist, addLoading} = useAddToWishlist();
    const {removeFromWishlist, removeLoading} = useRemoveFromWishlist();
    const {wishlistItems} = useWishlistProvider();
    const {authStage} = useAuthProvider();
    const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false)

    function removeItem(id: string) {
        const item = wishlistItems.find(item => item.likedProduct.id === id);
        if (item) removeFromWishlist(item.id)
    }

    const isInWishlist = useMemo(()=> {
        return (id:string) => {
            const result = wishlistItems.find(item => item.likedProduct.id === id);
            if (result) return true;
            else return false;
        }
    }, [wishlistItems])

    function closePhotoModal() {
        setShowPhotoModal(false);
    }
   
    return (
        <div className="w-full">
            <div className="w-full lg:max-w-[450px] relative">
                <h3 className="firago-bold text-sm leading-[17px] mb-5 text-black-08 dark:text-dark-black-8 ">{product?.title.charAt(0).toUpperCase() + product?.title.substring(1, product?.title.length)}</h3>
                <img src={product?.image} alt="product image" className="w-full h-[300px] object-contain cursor-pointer" onClick={()=>setShowPhotoModal(true)}/>
                <ProductPhotoModal product={product} modalOpen={showPhotoModal} closeModal={closePhotoModal}/>
                <div className={`${authStage === AuthStageEnum.AUTHORIZED ? 'flex' : 'hidden'} w-7 h-7 bg-white-400 rounded-[50%] absolute top-10 right-4 items-center justify-center`}>
                    {!(addLoading || removeLoading) && <img src={isInWishlist(product.id) ? wishlistIconActive : wishlistIcon} alt="wishlist icon" className="w-[18px] cursor-pointer" onClick={ () => isInWishlist(product.id) ? removeItem(product.id) : addToWishlist(product.id)}/>}
                    {(addLoading || removeLoading) && <LoadingSpinner size={28} fullscreen={false} custom={true}/>}
                </div>
            </div>
            <hr className="mt-[30px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
            <SimilarProducts category={product.category_name} productId={product.id}/>
            <hr className="mt-[30px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
            <div>
                <h3 className="firago-semibold text-base leading-5 text-black-main dark:text-dark-black-8 mb-[24px]"><FormattedMessage id="additional.info"/></h3>
                <AdditionalDetail paragraph={<FormattedMessage id="description"/>} text={product?.description}/>
            </div>
            <hr className="mt-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
        </div>
    )
}
