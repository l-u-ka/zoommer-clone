import CartProducts from "@src/components/CartProducts/CartProducts";
import { useCartProvider } from "@src/providers/CartProvider/useCartProvider"
import { FormattedMessage } from "react-intl"
import FullPriceCard from "../../components/FullPriceCard/FullPriceCard";
import FullPriceCardMobile from "../../components/FullPriceCard/FullPriceCardMobile/FullPriceCardMobile";
import { getFullPrice } from "@src/utils/exportFunctions";
import { useNavigate } from "react-router-dom";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import emptyBag from "@src/assets/icons/emptybag.png"
import binIcon from '@src/assets/icons/bin.png'
import CartPageSkeleton from "@src/components/Skeletons/CartPageSkeleton/CartPageSkeleton";
import { useRemoveFromCart } from "@src/hooks/useRemoveFromCart";
import LoadingSpinner from "@src/components/LoadingSpinner/LoadingSpinner";
import { usePurchaseProvider } from "@src/providers/PurchaseProvider/usePurchaseProvider";

export default function Cart() {

  const {cartItems, cartLoading} = useCartProvider();
  const {removeFromCart, removeFromCartLoading} = useRemoveFromCart();
  const fullPrice:number = getFullPrice(cartItems);
  const navigate = useNavigate();
  const {setTotalPurchaseAmount, setTotalPurchasePrice, setIsBuyingFromCart} = usePurchaseProvider();

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

  function clearCart() {
    for (const cartItem of cartItems) {
      removeFromCart(cartItem.id, true)
  }
  }

  console.log("CART ITEMS: ", cartItems)

  return (
    <div className="custom-container pt-[30px] pb-[60px]">
      {cartLoading ? (<CartPageSkeleton/>)
        : ((cartItems.length > 0) ? (
          <div>
            <div className="flex justify-between items-center">
              <h2 className="firago-bold text-2xl leading-[29px] text-black-main dark:text-dark-black-main"><FormattedMessage id="there.are"/> {cartItems.length} <FormattedMessage id="products.in.cart"/></h2>
              <div className="flex items-center cursor-pointer" onClick={clearCart}>
                <div /*onClick={()=>removeProduct(product.id, true)}*/ className='w-[30px] h-[30px] rounded-[50%] hover:bg-gray-shadow transition-all duration-300 ease-in-out flex items-center justify-center'>
                    {!removeFromCartLoading && <img src={binIcon} alt='remove from cart icon' className='w-4'/>}
                    {removeFromCartLoading && <LoadingSpinner fullscreen={false} size={24} custom={true}/>}
                </div>
                <h4 className=" ml-2 firago-medium text-sm leading-[17px] text-black-08 dark:text-dark-black-8 transition-colors duration-300 ease-in-out"><FormattedMessage id="clear"/></h4>
              </div> 
            </div>
           
            <hr className="mt-[24px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
            <div className="flex relative">
              <div className="w-full mb-32"><CartProducts/></div>
              <div className="min-w-[400px] ml-[50px] hidden lg:block">
                <FullPriceCard fullPrice={fullPrice} onClick={handleClick} buttonText="next"/>
              </div>
            </div>
            <FullPriceCardMobile fullPrice={fullPrice} onClick={handleClick}/>
        </div>
        ) : 
        <div className="w-full flex justify-center items-center">
          <img src={emptyBag} alt="empty cart icon" className="w-[300px]"/>
        </div>)
      }
    </div>
  )
}
