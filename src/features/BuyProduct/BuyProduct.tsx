import { ProductType } from "@src/@types/types";
import AddCartButton from "@src/components/AddCartButton/AddCartButton";
import PrimaryButton from "@src/components/PrimaryButton/PrimaryButton";
import { Auth_Stage_Enum } from "@src/providers/AuthProvider/AuthContext";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

export default function BuyProduct({product}: {product: ProductType}) {

    const navigate = useNavigate();
    const {setTotalPurchasePrice, setTotalPurchaseAmount, setIsBuyingFromCart} = useGlobalProvider();
    const {authStage} = useAuthProvider();
    const {setLoginModalOpen} = useGlobalProvider();

    function handleClick() {
        if (authStage === Auth_Stage_Enum.AUTHORIZED) {
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

    // useEffect(()=> {
    //     localStorage.setItem('purchaseAmount', JSON.stringify(totalPurchaseAmount));
    //     localStorage.setItem('purchasePrice', JSON.stringify(totalPurchasePrice));
    // }, [totalPurchaseAmount, totalPurchasePrice])

  return (
        <div className='w-full bg-white-400 dark:bg-dark-white-400 sticky top-0 shadow-lg py-5 rounded-xl'>
            <div className="px-5">
                {!product.salePrice && <h3 className="firago-semibold text-orange-main dark text-xl leading-6">{product.price} ₾</h3>}
                {product.salePrice && (
                    <div className="flex">
                        <h3 className="firago-semibold text-orange-main dark:text-text-dark-orange-main text-xl leading-6 mr-4">{product.salePrice} ₾</h3>
                        <h3 className="firago-medium text-black-07 dark:text-dark-black-07 text-base leading-[19px] relative ">
                        {product.price}
                        <span className="absolute top-[10px] left-0 right-0 h-[1px] bg-orange-main dark:bg-dark-orange-main transform translate-y-[-50%]"></span>
                    ₾</h3>
                    </div>
                )}
            </div>
            <hr className="mt-[24px] mb-[30px] border border-solid border-light-theme-bg dark:border-dark-theme-bg"/>
            <div className="px-5 grid grid-cols-1 gap-5">
                <PrimaryButton onClick={handleClick} height={50} width="100%"><p className="firago-bold text-base leading-[19px] text-white"><FormattedMessage id="buy.product"/></p></PrimaryButton>
                <AddCartButton height={50} borderRadius={12} productId={product.id}/>
            </div>
        </div>
    
  )
}
