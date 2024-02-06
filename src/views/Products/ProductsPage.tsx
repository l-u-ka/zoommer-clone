import { ProductType, SORT_BY_ENUM } from '@src/@types/types';
import useGetProducts from '@src/hooks/useGetProducts';
import { useNavigate, useParams } from 'react-router-dom'
import goBackIcon from '@src/assets/icons/category-left-arr.png'
import ProductsList from './ProductsList/ProductsList';
import FilterProducts from '@src/features/FilterProducts/FilterProducts';
import { useProductFiltersProvider } from '@src/providers/ProductFiltersProvider/useProductFiltersProvider';
import { useEffect, useState } from 'react';
import PaginationButtons from '@src/features/Pagination/PaginationButtons';
import SortProducts from '@src/features/SortProducts/SortProducts';
export default function Products() {
  
  const {category} = useParams();
  const {currentPage, pageSize, minPrice, maxPrice, isForSale, setMinPrice, setMaxPrice, defaultMinPrice, defaultMaxPrice} = useProductFiltersProvider();
  const {products, productsLoading, totalProducts, setProducts} = useGetProducts({categoryName: category as string, page: currentPage, pageSize: pageSize, minPrice: minPrice, maxPrice: maxPrice, onlySales: isForSale})
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<SORT_BY_ENUM>(SORT_BY_ENUM.DEFAULT);
  console.log(sortOrder)

  /* 
  export enum SORT_BY_ENUM {
  DEFAULT = "default",
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  TITLE_ASC = "title_asc",
  TITLE_DESC = "title_desc"
  } */

  function sortProducts() {
  switch (sortOrder) {
    case SORT_BY_ENUM.PRICE_ASC:
      setProducts([...products.sort((a, b) => a.price - b.price)]);
      break;
    case SORT_BY_ENUM.PRICE_DESC:
      setProducts([...products.sort((a, b) => b.price - a.price)]);
      break;
    case SORT_BY_ENUM.TITLE_ASC:
      setProducts([...products.sort((a, b) => a.title.localeCompare(b.title))]);
      break;
    case SORT_BY_ENUM.TITLE_DESC:
      setProducts([...products.sort((a, b) => b.title.localeCompare(a.title))]);
      break;
    default:
      break;
  }
}


  useEffect(()=> {
    if (products) {
      sortProducts();
    }
  }, [sortOrder])

  useEffect(()=> {
    setSortOrder(SORT_BY_ENUM.DEFAULT)
  }, [minPrice, maxPrice, isForSale])

  useEffect(()=> {
    setMinPrice(defaultMinPrice);
    setMaxPrice(defaultMaxPrice);
  }, [category])
  

  return (
    <div className='custom-container pt-[30px] pb-[60px]'>
      <div className='w-full flex justify-between items-center'>
        <div className='inline-flex items-center cursor-pointer' onClick={()=> {navigate(-1)}}>
          <img src={goBackIcon} alt='go back icon' className='h-full mr-[22px]'/>
          <h2 className='firago-bold text-base leading-[19px] text-black dark:text-orange-primary'>{category}</h2>
        </div>
        <div className='hidden lg:block w-40 h-10'>
          <SortProducts setSortOrder={setSortOrder} sortOrder={sortOrder}/>
        </div>
      </div>
      <hr className="mt-[24px] mb-[30px] border border-solid border-white-400"/>
      <div>
          <div>
            <div className='w-full flex'>
              <FilterProducts/>
              {productsLoading && <h3 className='ml-6'>Loading...</h3>}
              {(!productsLoading && products.length > 0) && <ProductsList products={products} totalProducts={totalProducts as number}/>}
              {(!productsLoading && products.length === 0) && <h2>პროდუქტები ვერ მოიძებნა</h2>}
            </div>
          </div>
      </div>
    </div>
  )
}
