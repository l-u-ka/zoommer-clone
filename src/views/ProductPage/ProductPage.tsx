import useGetSingleProduct from "@src/hooks/useGetSingleProduct";
import { useNavigate, useParams } from "react-router-dom"
import goBackIcon from '@src/assets/icons/category-left-arr.png'
import ProductDetails from "./ProductDetails/ProductDetails";
import { ProductType } from "@src/@types/types";

export default function ProductPage() {

    const {prodId, category} = useParams();
    const {product, singleProductLoading} = useGetSingleProduct({productId: prodId as string})
    const navigate = useNavigate();

    return (
      <div className="custom-container py-[30px]">
        {singleProductLoading && <h3>Loading...</h3>}
        {(!singleProductLoading && product) && (
          <div>
            <div className='w-full'>
              <div className='inline-flex items-center cursor-pointer mr-6' onClick={()=> {navigate('/')}}>
                <img src={goBackIcon} alt='go back icon' className='h-full mr-[20px]'/>
                <h2 className='firago-bold text-base leading-[19px] text-black dark:text-orange-primary'>მთავარი</h2>
              </div>
              <div className='inline-flex items-center cursor-pointer' onClick={()=> {navigate(`/products/${product?.category_name}`)}}>
                <img src={goBackIcon} alt='go back icon' className='h-full mr-[20px]'/>
                <h2 className='firago-bold text-base leading-[19px] text-black dark:text-orange-primary'>{category}</h2>
              </div>
            </div>
            <hr className="mt-[24px] mb-[30px] border border-solid border-white-400"/>
            <ProductDetails product={product as ProductType}/>
          </div>
        )}
      </div>
    )
}
