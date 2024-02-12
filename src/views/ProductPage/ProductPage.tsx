import useGetSingleProduct from "@src/hooks/useGetSingleProduct";
import { useNavigate, useParams } from "react-router-dom"
import goBackIcon from '@src/assets/icons/category-left-arr.png'
import ProductDetails from "./ProductDetails/ProductDetails";
import BuyProduct from "@src/features/BuyProduct/BuyProduct";
import BuyProductMobile from "@src/features/BuyProduct/BuyProductMobile";
import { FormattedMessage } from "react-intl";

export default function ProductPage() {

    const {prodId, category} = useParams();
    const {product, singleProductLoading} = useGetSingleProduct({productId: prodId as string})
    const navigate = useNavigate();

    return (
      <div className="custom-container py-[30px]">
        {singleProductLoading && <h3>Loading...</h3>}
        {(!singleProductLoading && product) && (
          <div className="w-full flex justify-between relative">
            <div className="w-full lg:max-w-[600px] xl:max-w-[740px]">
              <div className='w-full'>
                <div className='inline-flex items-center cursor-pointer mr-6' onClick={()=> {navigate('/')}}>
                  <img src={goBackIcon} alt='go back icon' className='h-full mr-[20px]'/>
                  <h2 className='firago-bold text-base leading-[19px] text-black dark:text-orange-primary'><FormattedMessage id="main"/></h2>
                </div>
                <div className='inline-flex items-center cursor-pointer' onClick={()=> {navigate(`/products/${product?.category_name}`)}}>
                  <img src={goBackIcon} alt='go back icon' className='h-full mr-[20px]'/>
                  <h2 className='firago-bold text-base leading-[19px] text-black dark:text-orange-primary'>{category}</h2>
                </div>
              </div>
              <hr className="mt-[24px] mb-[30px] border border-solid border-white-400"/>
              <ProductDetails product={product}/>
            </div>
            <div className="hidden lg:block w-[400px]">
              <BuyProduct product={product}/>
            </div>
            <div className="block lg:hidden">
              <BuyProductMobile product={product}/>
            </div>
          </div>
        )}
        {(!singleProductLoading && !product) && <h3>პროდუქტი ვერ ჩაიტვირთა</h3>}
      </div>
    )
}
