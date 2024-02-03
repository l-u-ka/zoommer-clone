import { ProductType } from "@src/@types/types";
import { useNavigate } from "react-router-dom";
import AddCartButton from "../AddCartButton/AddCartButton";

export default function ProductCard({product} : {product: ProductType}) {

    const navigate = useNavigate();

    return (
        <div key={product.id} className='col-span-1 max-w-36 md:max-w-[165px] h-[300px] flex flex-col justify-between'>
            <img onClick={()=>navigate(`/products/${product.category_name}/${product.id}`)}  src={product.image} alt="product image" className="w-36 md:w-[165px] h-[165px] object-cover cursor-pointer"/>
            <div>
                {!product.salePrice && <p className="firago-semibold text-base leading-[19px] mb-[10px] dark:text-orange-primary">{product.price} ₾</p>}
                {product.salePrice && (
                    <div className="flex">
                        <p className="firago-semibold text-base leading-[19px] mb-[10px] dark:text-orange-primary mr-2">{product.salePrice} ₾</p>
                        <p className="relative firago-normal text-xs text-black-07 dark:text-white-400">
                            {product.price} ₾
                            <span className="absolute top-2 left-0 right-0 h-[1px] bg-orange-primary transform translate-y-[-50%]"></span>
                        </p>
                    </div>
                )}
                <h3 onClick={()=>navigate(`/products/${product.category_name}/${product.id}`)}  className="max-w-40 firago-medium text-xs leading-[18px] opacity-80 cursor-pointer dark:text-orange-primary">{product.title}</h3>
            </div>
            <AddCartButton height={40} borderRadius={4}/>
        </div>
    )
}
