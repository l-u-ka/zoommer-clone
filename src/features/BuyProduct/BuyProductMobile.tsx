import { Product } from "@src/@types/types";
import cartIcon from '@src/assets/icons/light/cart.png'
import cartIconActive from '@src/assets/icons/light/cart-active.png'
import cartIconDark from '@src/assets/icons/dark/cart.png'
import cartIconDarkActive from '@src/assets/icons/dark/cart-active.png'
import AlreadyInCartModal from "@src/components/AlreadyInCartModal/AlreadyInCartModal";
import LoadingSpinner from "@src/components/LoadingSpinner/LoadingSpinner";
import { useAddToCart } from "@src/hooks/useAddToCart";
import { useCartProvider } from "@src/providers/CartProvider/useCartProvider";
import { usePurchaseProvider } from "@src/providers/PurchaseProvider/usePurchaseProvider";
import {useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { AuthStageEnum } from "@src/providers/AuthProvider/AuthContext";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";

export default function BuyProductMobile({product}: {product: Product}) {

  const {addToCartLoading, addToCart} = useAddToCart();
  const {cartItems} = useCartProvider();
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const {setTotalPurchasePrice, setTotalPurchaseAmount, setIsBuyingFromCart} = usePurchaseProvider();
  const {lightMode} = useThemeProvider();
  const {authStage} = useAuthProvider();
  const {setLoginModalOpen} = useGlobalProvider();

  /* check if product is already in cart */
  const isInCart = useMemo(()=> {
    return (productId: string) => {
      const result = cartItems.find(item => item.cartProduct.id === productId);
      return result ? true : false;
    }
  }, [cartItems])

  function closeModal() {
    setShowModal(false);
  }

  /* after use clicks to buy the product, set purchase amount and price of the product, save it in local storage and navigate no buy product page */
  function handleClick() {
    if (authStage === AuthStageEnum.AUTHORIZED) {
      setTotalPurchaseAmount(1);
      setTotalPurchasePrice(product.salePrice || product.price);
      localStorage.setItem('purchaseAmount', JSON.stringify(1));
      localStorage.setItem('purchasePrice', JSON.stringify(product.salePrice || product.price));
      setIsBuyingFromCart(false);
      localStorage.setItem('isBuyingFromCart', JSON.stringify(false))
      navigate("/buy-product");
    } else {
      setLoginModalOpen(true);
    }
  }

  function handleCartClick() {
    if (authStage === AuthStageEnum.AUTHORIZED) {
      isInCart(product.id) ? setShowModal(true) : addToCart(product.id)
    } else {
      setLoginModalOpen(true);
    }
  }

  function getCartIcon():string {
    let icon:string = '';
    // isInCart(product.id) ? cartIconActive : lightMode ? cartIcon : cartIconDark
    if (lightMode) {
      if (isInCart(product.id)) {
        icon = cartIconActive;
      } else {
        icon = cartIcon;
      }
    } else {
      if (isInCart(product.id)) {
        icon = cartIconDarkActive;
      } else {
        icon = cartIconDark;
      }
    }
    return icon;
  }


  return (
        <div className="flex justify-between items-center lg:hidden w-full fixed left-0 bottom-[70px] py-2 bg-orange-main dark:bg-dark-orange-main transition-colors duration-300 ease-in-out z-20 p-2 shadow-top">
             <h3 className="text-white dark:text-black-main firago-bold text-xl leading-6">{product.salePrice ? product.salePrice : product.price} ₾</h3>
             <div className="flex items-center">
                <button onClick={handleCartClick} className="h-9 w-9 dark:bg-dark-white-400 inline-flex items-center justify-center rounded-md border-none hover:scale-105 active:scale-75 cursor-pointer mr-3 transition-all duration-300 ease-in-out">{ addToCartLoading ? <LoadingSpinner fullscreen={false} custom={true} size={16}/> : <img src={getCartIcon()} alt="mobile cart icon" className="w-4"/>}</button>
                <button onClick={handleClick} className="h-9 w-[100px] dark:bg-dark-white-400 inline-flex items-center justify-center rounded-md border-none hover:scale-105 active:scale-75 active:scale-80 cursor-pointer firago-bold text-orange-main dark:text-text-dark-orange-main text-sm leading-[17px] transition-all duration-300 ease-in-out"><FormattedMessage id="buy.product"/></button>
             </div>
             {<AlreadyInCartModal closeModal={closeModal} modalOpen={showModal}/>}
        </div>
  )
}
