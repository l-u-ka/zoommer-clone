import { ProductType } from "@src/@types/types";
import cartIcon from '@src/assets/icons/cart.svg'
import AlreadyInCartModal from "@src/components/AlreadyInCartModal/AlreadyInCartModal";
import { useAddToCart } from "@src/hooks/useAddToCart";
import { useCartProvider } from "@src/providers/CartProvider/useCartProvider";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

export default function BuyProductMobile({product}: {product: ProductType}) {

  const {addToCartLoading, addToCart} = useAddToCart();
  const {cartItems} = useCartProvider();
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const {setTotalPurchasePrice, setTotalPurchaseAmount, setIsBuyingFromCart} = useGlobalProvider();

  // function removeProduct(productId: string) {
  //   const result = cartItems.find(item => item.cartProduct.id === productId);
  //   console.log(result);
  //   if(result) removeFromCart(result.id)
  // }

  function isInCart(productId: string) {
    const result = cartItems.find(item => item.cartProduct.id === productId);
    if (result) return true;
    else return false;
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleClick() {
    setTotalPurchaseAmount(1);
    setTotalPurchasePrice(product.salePrice || product.price);
    localStorage.setItem('purchaseAmount', JSON.stringify(1));
    localStorage.setItem('purchasePrice', JSON.stringify(product.salePrice || product.price));
    setIsBuyingFromCart(false);
    localStorage.setItem('isBuyingFromCart', JSON.stringify(false))
    navigate("/buy-product");
  }

  // useEffect(()=> {
  //   localStorage.setItem('purchaseAmount', JSON.stringify(totalPurchaseAmount));
  //   localStorage.setItem('purchasePrice', JSON.stringify(totalPurchasePrice));
  // }, [totalPurchaseAmount, totalPurchasePrice])

  return (
        <div className="flex justify-between items-center lg:hidden w-full fixed left-0 bottom-[70px] py-2 bg-orange-primary z-10 p-2">
             <h3 className="text-white firago-bold text-xl leading-6">{product.salePrice ? product.salePrice : product.price} ₾</h3>
             <div className="flex items-center">
                <button onClick={()=>{isInCart(product.id) ? setShowModal(true) : addToCart(product.id)}} className="h-9 w-9 inline-flex items-center justify-center rounded-md border-none hover:scale-105 cursor-pointer mr-3"><img src={cartIcon} alt="mobile cart icon" className="w-4"/></button>
                <button onClick={handleClick} className="h-9 w-[100px] inline-flex items-center justify-center rounded-md border-none hover:scale-105 cursor-pointer firago-bold text-orange-primary text-sm leading-[17px]"><FormattedMessage id="buy.product"/></button>
             </div>
             {<AlreadyInCartModal closeModal={closeModal} modalOpen={showModal}/>}
        </div>
  )
}
