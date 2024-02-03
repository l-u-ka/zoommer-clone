import { ProductType } from '@src/@types/types';
import useGetProducts from '@src/hooks/useGetProducts';
import { useNavigate, useParams } from 'react-router-dom'
import goBackIcon from '@src/assets/icons/category-left-arr.png'
import ProductsList from './ProductsList/ProductsList';
import FilterProducts from '@src/features/FilterProducts/FilterProducts';
export default function Products() {
  
  const {category} = useParams();
  const {products, productsLoading} = useGetProducts({categoryName: category as string, pageSize: 12, page: 1})
  const navigate = useNavigate();
  

  return (
    <div className='custom-container pt-[30px] pb-[60px]'>
      <div className='w-full'>
        <div className='inline-flex items-center cursor-pointer' onClick={()=> {navigate(-1)}}>
          <img src={goBackIcon} alt='go back icon' className='h-full mr-[22px]'/>
          <h2 className='firago-bold text-base leading-[19px] text-black dark:text-orange-primary'>{category}</h2>
        </div>
      </div>
      <hr className="mt-[24px] mb-[30px] border border-solid border-white-400"/>
      <div>
        {productsLoading ? <h3>Loading...</h3> : (
          <div className='w-full flex'>
            <FilterProducts/>
            <ProductsList products={products}/>
          </div>
        )}
      </div>
    </div>
  )
}
