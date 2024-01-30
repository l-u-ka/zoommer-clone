import { ProductType } from "@src/@types/types";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function ProductCard({product} : {product: ProductType}) {

    const navigate = useNavigate();

    return (
        <div onClick={()=>navigate(`/product/${product.id}`)} key={product.id} className='col-span-1 max-w-40'>
            <img src={product.image} alt="product image" className="w-40 h-40"/>
            <p>{product.price} ₾</p>
            <h3>{product.title}</h3>
            <Button type="primary">დამატება</Button>
        </div>
    )
}
