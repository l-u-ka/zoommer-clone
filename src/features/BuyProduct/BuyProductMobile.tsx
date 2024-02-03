import { ProductType } from "@src/@types/types";
import cartIcon from '@src/assets/icons/cart.svg'

export default function BuyProductMobile({product}: {product: ProductType}) {
  return (
        <div className="flex justify-between items-center lg:hidden w-full fixed left-0 bottom-0 py-2 bg-orange-primary z-10 p-2">
             <h3 className="text-white firago-bold text-xl leading-6">{product.salePrice ? product.salePrice : product.price} ₾</h3>
             <div className="flex items-center">
                <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border-none hover:scale-105 cursor-pointer mr-3"><img src={cartIcon} alt="mobile cart icon" className="w-4"/></button>
                <button className="h-9 w-[100px] inline-flex items-center justify-center rounded-md border-none hover:scale-105 cursor-pointer firago-bold text-orange-primary text-sm leading-[17px]">ყიდვა</button>
             </div>
        </div>
  )
}
