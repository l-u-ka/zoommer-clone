import { FormattedMessage } from "react-intl"
import cartButtonIcon from '@src/assets/icons/light/cart.png'
import { Button, ConfigProvider, ThemeConfig } from "antd"
import { useAddToCart } from "@src/hooks/useAddToCart"
import { useCartProvider } from "@src/providers/CartProvider/useCartProvider"
import { useState } from "react"
import AlreadyInCartModal from "../AlreadyInCartModal/AlreadyInCartModal"
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider"
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider"
import { AuthStageEnum } from "@src/providers/AuthProvider/AuthContext"
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider"

interface AddCartButtonProps {
  height: number;
  borderRadius: number; 
  productId: string
}

export default function AddCartButton({height, borderRadius, productId} : AddCartButtonProps) {

  const {lightMode} = useThemeProvider();
  const {addToCartLoading, addToCart} = useAddToCart();
  const {cartItems} = useCartProvider();
  const [showModal, setShowModal] = useState<boolean>(false);
  const {authStage} = useAuthProvider();
  const {setLoginModalOpen} = useGlobalProvider();

  const customTheme:ThemeConfig = {
    "components": {
      "Button": {
        "colorPrimary": lightMode ? "rgb(242, 143, 106)" : "#882e0c",
        "colorPrimaryHover": lightMode ? "rgb(242, 143, 106)" : "#882e0c",
        "colorPrimaryActive": "rgb(236, 94, 42)",
        "borderRadius": borderRadius,
        "controlHeight": height,
        "controlHeightLG": height,
        "controlHeightSM": height,
        "lineHeight": 1.0625
      }
    }
  }

  {/* check if product is already in cart */}
  function isInCart(productId: string) {
    const result = cartItems.find(item => item.cartProduct.id === productId);
    if (result) return true;
    else return false;
  }

  function closeModal() {
    setShowModal(false);
  }
  {/* if user wants to add to cart and is not authorized, show login modal - otherwise add it */}
  function handleCllick() {
    if (authStage === AuthStageEnum.AUTHORIZED) {
      if (isInCart(productId)) setShowModal(true);
      else addToCart(productId);
    } else setLoginModalOpen(true);
  }

  return (
    <ConfigProvider theme={customTheme}>
        <Button type="primary" className="flex justify-center items-center hover:scale-95 transition-all ease-in-out w-full" loading={addToCartLoading} onClick={handleCllick}>
          <div className="inline-flex items-center mx-auto">
              <img src={cartButtonIcon} className="w-[14px] mr-[10px]"/>
              <p className="text-black-main firago-semibold text-xs leading-5 opacity-80"><FormattedMessage id={isInCart(productId) ? "added" : "add"}/></p>
          </div>
        </Button>
        {<AlreadyInCartModal closeModal={closeModal} modalOpen={showModal}/>}
      </ConfigProvider>
  )
}
