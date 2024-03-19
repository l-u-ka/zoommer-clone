import { Product } from "@src/@types/types";
import { useNavigate } from "react-router-dom";
import AddCartButton from "../AddCartButton/AddCartButton";
import wishlistIcon from '@src/assets/icons/product-details-heart.png'
import wishlistIconActive from '@src/assets/icons/product-details-heart-active.png'
import { useWishlistProvider } from "@src/providers/WishlistProvider/useWishlistProvider";
import { useAddToWishlist } from "@src/hooks/useAddToWishlist";
import { useRemoveFromWishlist } from "@src/hooks/useRemoveFromWishlist";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { AuthStageEnum } from "@src/providers/AuthProvider/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function ProductCard({product} : {product: Product}) {
    const navigate = useNavigate();
    const {addToWishlist, addLoading} = useAddToWishlist();
    const {removeFromWishlist, removeLoading} = useRemoveFromWishlist();
    const {wishlistItems} = useWishlistProvider();
    const {authStage} = useAuthProvider();
    
    /* find item with product id and remove it from wishlist if found */
    function removeItem(id: string) {
        const item = wishlistItems.find(item => item.likedProduct.id === id);
        if (item) removeFromWishlist(item.id)
    }

    /* check if product is already in wishlist */
    function isInWishlist(id:string) {
        const result = wishlistItems.find(item => item.likedProduct.id === id);
        if (result) return true;
        else return false;
    }

    return (
            <div className='col-span-1 w-[140px] md:w-[165px] h-[300px] flex flex-col justify-between relative mx-auto'>
                <img onClick={()=>navigate(`/products/${product.category_name}/details/${product.id}`)}  src={product.image} alt="product image" className="w-full h-[165px] object-cover cursor-pointer"/> 
                <div className={`${authStage === AuthStageEnum.AUTHORIZED ? 'flex' : 'hidden'} w-7 h-7 bg-white-400 rounded-[50%] absolute top-1 right-1 items-center justify-center`}>
                    {(addLoading || removeLoading) ? <LoadingSpinner size={28} fullscreen={false} custom={true}/>
                        : <img src={isInWishlist(product.id) ? wishlistIconActive : wishlistIcon} alt="wishlist icon" className="w-[18px] cursor-pointer" onClick={ () => isInWishlist(product.id) ? removeItem(product.id) : addToWishlist(product.id)}/>
                    }
                </div>
                <div>
                    {!product.salePrice && <p className="firago-semibold text-base leading-[19px] mb-3 text-black-main dark:text-dark-black-main">{product.price} ₾</p>}
                    {product.salePrice && (
                        <div className="flex">
                            <p className="firago-semibold text-base leading-[19px] mb-3 text-orange-main dark:text-text-dark-orange-main mr-2">{product.salePrice} ₾</p>
                            <p className="relative firago-normal text-xs text-black-07 dark:text-dark-black-07">
                                {product.price} ₾
                                <span className="absolute top-2 left-0 right-0 h-[1px] bg-orange-main transform translate-y-[-50%]"></span>
                            </p>
                        </div>
                    )}
                    <h3 onClick={()=>navigate(`/products/${product.category_name}/details/${product.id}`)}  className="max-w-40 firago-medium text-xs leading-[18px] opacity-80 cursor-pointer text-black-main dark:text-dark-black-main">{product.title}</h3>          
                </div>
                <AddCartButton height={40} borderRadius={4} productId={product.id}/>    
        </div>
    )
}
