import { useNavigate, useParams } from "react-router-dom"
import { FormattedMessage } from "react-intl";
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import useGetSingleProduct from "@src/hooks/useGetSingleProduct";
import goBackIcon from '@src/assets/icons/light/category-left-arr.png'
import goBackIconDark from '@src/assets/icons/dark/category-left-arr.png'
import ProductDetails from "./ProductDetails/ProductDetails";
import BuyProduct from "@src/features/BuyProduct/BuyProduct";
import BuyProductMobile from "@src/features/BuyProduct/BuyProductMobile";
import ProductPageSkeleton from "../../components/Skeletons/ProductPageSkeleton/ProductPageSkeleton";
import { useEffect } from "react";


export default function ProductPage() {

    const {prodId, category} = useParams();
    const {product, singleProductLoading} = useGetSingleProduct({productId: prodId as string})
    const navigate = useNavigate();
    const {lightMode} = useThemeProvider();

    // scroll to top after loading is done
    useEffect(()=> {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [singleProductLoading])

    return (
      <div className="custom-container py-[30px] min-h-[80vh]">
        {singleProductLoading ? <ProductPageSkeleton/> : 
          product ? (  // if it is not loading, and product exist
          <div className="w-full flex justify-between relative">
            <div className="w-full lg:max-w-[600px] xl:max-w-[740px]">
              <div className='w-full'>
                <div className='inline-flex items-center cursor-pointer mr-6' onClick={()=> {navigate('/')}}>
                  <img src={lightMode? goBackIcon : goBackIconDark} alt='go back icon' className='h-full mr-[20px]'/>
                  <h2 className='firago-bold text-base leading-[19px] text-black-08 dark:text-dark-black-8'><FormattedMessage id="main"/></h2>
                </div>
                <div className='inline-flex items-center cursor-pointer' onClick={()=> {navigate(`/products/${product?.category_name}`)}}>
                  <img src={lightMode? goBackIcon : goBackIconDark} alt='go back icon' className='h-full mr-[20px]'/>
                  <h2 className='firago-bold text-base leading-[19px] text-black-08 dark:text-dark-black-8'>{category}</h2>
                </div>
              </div>
              <hr className="mt-[24px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
              <ProductDetails product={product}/>
            </div>
            <div className="hidden lg:block w-[400px]">
              <BuyProduct product={product}/>
            </div>
            <div className="block lg:hidden">
              <BuyProductMobile product={product}/>
            </div>
          </div>
        ) // if it is not loading, and product does not exist
        : <h3 className="firago-semibold text-lg leading-6 text-black-main dark:text-dark-black-main"> <FormattedMessage id="product.could.not.load" /></h3>}
      </div>
    )
}
