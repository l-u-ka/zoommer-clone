import { ProductType } from '@src/@types/types';
import useGetProducts from '@src/hooks/useGetProducts';
import { useNavigate, useParams } from 'react-router-dom'
import goBackIcon from '@src/assets/icons/category-left-arr.png'
import clearIcon from '@src/assets/icons/clear.png'
import ProductsList from './ProductsList/ProductsList';
import { FormattedMessage } from 'react-intl';
export default function Products() {
  
  const {category} = useParams();
  const {products, productsLoading} = useGetProducts({categoryName: category as string})
  const navigate = useNavigate();
  

  return (
    <div className='custom-container pt-[30px] pb-[60px]'>
      <div className='w-full'>
        <div className='inline-flex items-center cursor-pointer' onClick={()=> {navigate(-1)}}>
          <img src={goBackIcon} alt='go back icon' className='h-full mr-[22px]'/>
          <h2 className='firago-bold text-base leading-[19px] text-black'>{category}</h2>
        </div>
      </div>
      <hr className="mt-[24px] mb-[30px] border border-solid border-white-400"/>
      <div>
        {productsLoading ? <h3>Loading...</h3> : (
          <div className='w-full flex'>
            <div className='w-[350px] hidden lg:block'>
              <div className='flex justify-between items-center'>
                <h2 className='firago-medium text-base leading-[19px]'><FormattedMessage id='filter'/></h2>
                <div className='inline-flex items-center cursor-pointer'>
                  <img src={clearIcon} alt='clear filet icon' className='w-full mr-2'/>
                  <h2 className='firago-medium text-xs leading-[14px] opacity-60'><FormattedMessage id='clear'/></h2>
                </div>
              </div>
              <hr className="mt-[22px] mb-[40px] border border-solid border-white-400"/>
            </div>
            <ProductsList products={products}/>
          </div>
        )}
      </div>
    </div>
  )
}
