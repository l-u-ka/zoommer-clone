import { FormattedMessage } from "react-intl"
import cartButtonIcon from '@src/assets/icons/cart-button.png'
import { Button, ConfigProvider, ThemeConfig } from "antd"
import { useAddToCart } from "@src/hooks/useAddToCart"
import { useCartProvider } from "@src/providers/CartProvider/useCartProvider"
import { useState } from "react"
import AlreadyInCartModal from "../AlreadyInCartModal/AlreadyInCartModal"

export default function AddCartButton({height, borderRadius, productId} : {height: number, borderRadius: number, productId: string}) {

  const customTheme:ThemeConfig = {
    "components": {
      "Button": {
        "colorPrimary": "rgb(242, 143, 106)",
        "colorPrimaryHover": "rgb(242, 143, 106)",
        "colorPrimaryActive": "rgb(236, 94, 42)",
        "borderRadius": borderRadius,
        "controlHeight": height,
        "controlHeightLG": height,
        "controlHeightSM": height,
        "lineHeight": 1.0625
      }
    }
  }

  const {addToCartLoading, addToCart} = useAddToCart();
  const {cartItems} = useCartProvider();
  const [showModal, setShowModal] = useState<boolean>(false);

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

  return (
    // <button style={{height: height}} className="border-none bg-[#f28f6a] rounded cursor-pointer hover:scale-95 transition-all ease-in-out">
    <ConfigProvider theme={customTheme}>
        <Button type="primary" className="flex justify-center items-center hover:scale-95 transition-all ease-in-out w-full" loading={addToCartLoading} onClick={()=>{isInCart(productId) ? setShowModal(true) : addToCart(productId)}}>
          <div className="inline-flex items-center mx-auto">
              <img src={cartButtonIcon} className="w-[14px] mr-[10px]"/>
              <p className="text-black firago-semibold text-xs leading-5 opacity-80"><FormattedMessage id={isInCart(productId) ? "added" : "add"}/></p>
          </div>
        </Button>
        {<AlreadyInCartModal closeModal={closeModal} modalOpen={showModal}/>}
      </ConfigProvider>
    // </button>
  )
}
