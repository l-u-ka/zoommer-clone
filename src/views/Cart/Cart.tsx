import CartProducts from "@src/components/CartProducts/CartProducts";
import { useCartProvider } from "@src/providers/CartProvider/useCartProvider"
import { FormattedMessage } from "react-intl"
import FullPriceCard from "../../components/FullPriceCard/FullPriceCard";
import FullPriceCardMobile from "../../components/FullPriceCard/FullPriceCardMobile/FullPriceCardMobile";
import { getFullPrice } from "@src/utils/exportFunctions";
import { useNavigate } from "react-router-dom";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import emptyBag from "@src/assets/icons/emptybag.png"
import { Skeleton } from "antd";

export default function Cart() {

  const {cartItems, cartLoading} = useCartProvider();
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
    <div className="custom-container pt-[30px] pb-[60px]">
      {cartLoading ? (<div>
            <Skeleton.Input active size="default" block style={{width: '30%'}}/>
            <hr className="mt-[24px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
            <div className="flex">
              <div className="w-full mb-32 flex justify-between">
                <div className='w-full grid grid-cols-1 gap-[10px]'>
                  <Skeleton.Node children={false} active style={{width: '100%', height: '80px'}}/>
                  <Skeleton.Node children={false} active style={{width: '100%', height: '80px'}}/>
                  <Skeleton.Node children={false} active style={{width: '100%', height: '80px'}}/>
                </div>
                <div className='hidden lg:block ml-[50px]'>
                  <Skeleton.Node children={false} active style={{width: '400px', height: '240px', borderRadius: '12px'}}/>
                </div>
              </div>
              
            </div>
        </div>)
        : ((cartItems.length > 0) ? (
          <>
            <h2 className="firago-bold text-2xl leading-[29px] text-black-main dark:text-dark-black-main"><FormattedMessage id="there.are"/> {cartItems.length} <FormattedMessage id="products.in.cart"/></h2>
            <hr className="mt-[24px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
            <div className="flex relative">
              <div className="w-full mb-32"><CartProducts/></div>
              <div className="min-w-[400px] ml-[50px] hidden lg:block">
                <FullPriceCard fullPrice={fullPrice} onClick={handleClick} buttonText="next"/>
              </div>
            </div>
            <FullPriceCardMobile fullPrice={fullPrice} onClick={handleClick}/>
        </>
        ) : <div className="w-full flex justify-center items-center h-full">
            <img src={emptyBag} alt="empty cart icon" className="w-[300px]"/>
          </div>)
      }
    </div>
  )
}
