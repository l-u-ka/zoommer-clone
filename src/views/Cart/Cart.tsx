import CartProducts from "@src/components/CartProducts/CartProducts";
import { useCartProvider } from "@src/providers/CartProvider/useCartProvider"
import { FormattedMessage } from "react-intl"
import CartFullPrice from "./CartFullPrice/CartFullPrice";
import CartFullPriceMobile from "./CartFullPrice/CartFullPriceMobile";
import { getFullPrice } from "@src/utils/exportFunctions";

export default function Cart() {

  const {cartItems} = useCartProvider();
  const fullPrice:number = getFullPrice(cartItems);
  // const cartProducts = cartItems.map((cartItems) => {
  //   return <CartProducts/>
  // })

  return (
    <div className="custom-container pt-[30px] pb-[60px] min-h-screen">
      <h2 className="firago-bold text-2xl leading-[29px] opacity-60 text-black dark:text-white-400"><FormattedMessage id="there.are"/> {cartItems.length} <FormattedMessage id="products.in.cart"/></h2>
      <hr className="mt-[24px] mb-[30px] border border-solid border-white-400"/>
      <div className="flex relative">
        <div className="w-full"><CartProducts/></div>
        <div className="min-w-[400px] ml-[50px] hidden lg:block">
          <CartFullPrice fullPrice={fullPrice}/>
        </div>
      </div>
      <CartFullPriceMobile fullPrice={fullPrice}/>
    </div>
  )
}
