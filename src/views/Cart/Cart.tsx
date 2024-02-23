import CartProducts from "@src/components/CartProducts/CartProducts";
import { useCartProvider } from "@src/providers/CartProvider/useCartProvider"
import { FormattedMessage } from "react-intl"
import FullPriceCard from "../../components/FullPriceCard/FullPriceCard";
import FullPriceCardMobile from "../../components/FullPriceCard/FullPriceCardMobile/FullPriceCardMobile";
import { getFullPrice } from "@src/utils/exportFunctions";
import { useNavigate } from "react-router-dom";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import emptyBag from "@src/assets/icons/emptybag.png"
import { ProductType } from "@src/@types/types";
import { useEffect } from "react";

export default function Cart() {

  const {cartItems} = useCartProvider();
  const fullPrice:number = getFullPrice(cartItems);
  const navigate = useNavigate();
  const {setTotalPurchaseAmount, setTotalPurchasePrice, setIsBuyingFromCart} = useGlobalProvider();
  // const cartProducts = cartItems.map((cartItems) => {
  //   return <CartProducts/>
  // })

  function handleClick() {
    // setProductsToBuy(cartItems);
    let totalPrice:number = 0;
    let totalAmount:number = 0;
    // SET TOTAL PURCHASE PRICE AND AMOUNT
    for (const cartItem of cartItems) {
      for (let i=0; i<cartItem.count; i++) {
        totalPrice += cartItem.cartProduct.salePrice || cartItem.cartProduct.price;
        totalAmount++;
      }
      setTotalPurchaseAmount(totalAmount);
      setTotalPurchasePrice(totalPrice);
      localStorage.setItem('purchaseAmount', JSON.stringify(totalAmount));
      localStorage.setItem('purchasePrice', JSON.stringify(totalPrice));
    }
    setIsBuyingFromCart(true);
    localStorage.setItem('isBuyingFromCart', JSON.stringify(true))
    navigate('/buy-product');
  }

  // useEffect(()=> {
  //   localStorage.setItem('purchaseAmount', JSON.stringify(totalPurchaseAmount));
  //   localStorage.setItem('purchasePrice', JSON.stringify(totalPurchasePrice));
  // }, [totalPurchaseAmount, totalPurchasePrice])

  console.log("CART ITEMS: ", cartItems)

  return (
    <div className="custom-container pt-[30px] pb-[60px] h-screen">
      {cartItems.length > 0 ? (
        <>
          <h2 className="firago-bold text-2xl leading-[29px] opacity-60 text-black dark:text-white-400"><FormattedMessage id="there.are"/> {cartItems.length} <FormattedMessage id="products.in.cart"/></h2>
          <hr className="mt-[24px] mb-[30px] border border-solid border-white-400"/>
          <div className="flex relative">
            <div className="w-full"><CartProducts/></div>
            <div className="min-w-[400px] ml-[50px] hidden lg:block">
              <FullPriceCard fullPrice={fullPrice} onClick={handleClick}/>
            </div>
          </div>
          <FullPriceCardMobile fullPrice={fullPrice} onClick={handleClick}/>
      </>
      ) : <div className="w-full flex justify-center items-center h-full">
          <img src={emptyBag} alt="empty cart icon" className="w-[300px]"/>
        </div>}
    </div>
  )
}
