import { ProductType } from "@src/@types/types";
import { useNavigate } from "react-router-dom";
import AddCartButton from "../AddCartButton/AddCartButton";

export default function ProductCard({product} : {product: ProductType}) {

    const navigate = useNavigate();

    return (
        <div key={product.id} className='col-span-1 max-w-36 md:max-w-[165px] h-[300px] flex flex-col justify-between'>
            <img onClick={()=>navigate(`/product/${product.id}`)}  src={product.image} alt="product image" className="w-[165px] h-[165px] object-cover cursor-pointer"/>
            <div>
                <p className="firago-semibold text-base leading-[19px] mb-[10px] dark:text-orange-primary">{product.price} ₾</p>
                <h3 onClick={()=>navigate(`/product/${product.id}`)}  className="max-w-40 firago-medium text-xs leading-[18px] opacity-80 cursor-pointer dark:text-orange-primary">{product.title}</h3>
            </div>
            <AddCartButton height={'40px'}/>
        </div>
    )
}
