import { ProductType } from "@src/@types/types";
import AddCartButton from "@src/components/AddCartButton/AddCartButton";
import PrimaryButton from "@src/components/PrimaryButton/PrimaryButton";
import { FormattedMessage } from "react-intl";

export default function BuyProduct({product}: {product: ProductType}) {
  return (
        <div className='w-[400px] bg-[#f2f2f2] fixed shadow-lg py-5 rounded-xl'>
            <div className="px-5">
                {!product.salePrice && <h3 className="firago-semibold text-orange-primary text-xl leading-6">{product.price} ₾</h3>}
                {product.salePrice && (
                    <div className="flex">
                        <h3 className="firago-semibold text-orange-primary text-xl leading-6 mr-4">{product.salePrice} ₾</h3>
                        <h3 className="firago-medium text-black-07 text-base leading-[19px] relative">
                        {product.price}
                        <span className="absolute top-[10px] left-0 right-0 h-[1px] bg-orange-primary transform translate-y-[-50%]"></span>
                    ₾</h3>
                    </div>
                )}
            </div>
            <hr className="mt-[24px] mb-[30px] border border-solid border-white"/>
            <div className="px-5 grid grid-cols-1 gap-5">
                <PrimaryButton height={50} width="100%"><p className="firago-bold text-base leading-[19px] text-white"><FormattedMessage id="buy.product"/></p></PrimaryButton>
                <AddCartButton height={50} borderRadius={12}/>
            </div>
        </div>
    
  )
}
