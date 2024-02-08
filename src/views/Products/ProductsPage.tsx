import { SORT_BY_ENUM } from '@src/@types/types';
import useGetProducts from '@src/hooks/useGetProducts';
import { useNavigate, useParams } from 'react-router-dom'
import goBackIcon from '@src/assets/icons/category-left-arr.png'
import ProductsList from './ProductsList/ProductsList';
import FilterProducts from '@src/features/FilterProducts/FilterProducts';
import { useProductFiltersProvider } from '@src/providers/ProductFiltersProvider/useProductFiltersProvider';
import { useEffect, useState } from 'react';
import SortProducts from '@src/features/SortProducts/SortProducts';
import { FormattedMessage } from 'react-intl';
import filterIcon from '@src/assets/icons/filter.png'
import FilterProductsMobile from '@src/features/FilterProducts/FilterProductsMobile';

export default function Products() {
  
  const {category} = useParams();
  const {currentPage, pageSize, minPrice, maxPrice, isForSale, setMinPrice, setMaxPrice, defaultMinPrice, defaultMaxPrice} = useProductFiltersProvider();
  const {products, productsLoading, totalProducts, setProducts} = useGetProducts({categoryName: category as string, page: currentPage, pageSize: pageSize, minPrice: minPrice, maxPrice: maxPrice, onlySales: isForSale})
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<SORT_BY_ENUM>(SORT_BY_ENUM.DEFAULT);
  const [filterModal, setFilterModal] = useState<boolean>(false);


  const showFilterModal = () => {
    setFilterModal(true);
  };

  const handleFilterCancel = () => {
    setFilterModal(false);
  };

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
    <div className='custom-container pt-[30px] pb-[60px] min-h-[700px]'>
      <div className='w-full flex flex-col lg:flex-row lg:justify-between items-start lg:items-center'>
        <div className='inline-flex items-center cursor-pointer' onClick={()=> {navigate(-1)}}>
          <img src={goBackIcon} alt='go back icon' className='h-full mr-[22px]'/>
          <h2 className='firago-bold text-base leading-[19px] text-black dark:text-orange-primary'>{category}</h2>
        </div>
        <div className='hidden lg:block w-40 h-10'>
          <SortProducts setSortOrder={setSortOrder} sortOrder={sortOrder}/>
        </div>
        <div className='w-full lg:hidden mt-4'>
          <hr className="border border-solid border-white-400 mb-4"/>
          <div className='flex items-center justify-between'>
            <div className='w-full h-10 mr-8'>
              <SortProducts setSortOrder={setSortOrder} sortOrder={sortOrder}/>
            </div>
            {/* add mobile filter button below*/}
            <div className='w-full'>
              <button className='w-full h-10 border-none px-5 rounded-[30px] cursor-pointer shadow-md' onClick={showFilterModal}>
                <div className='flex justify-start items-center'>
                  <img alt='filter icon' src={filterIcon} className='w-5 mr-[10px]'/>
                  <p className='firago-medium text-xs leading-[14px]'><FormattedMessage id='filter'/></p>
                </div>
              </button>
              <FilterProductsMobile isModalOpen={filterModal} handleCancel={handleFilterCancel}/>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-[24px] mb-[30px] border border-solid border-white-400"/>
      <div>
          <div>
            <div className='w-full flex'>
              <div className='w-[350px] min-w-[350px] hidden lg:block'>
                <FilterProducts/>
              </div>
              {productsLoading && <h3 className='ml-6'>Loading...</h3>}
              {(!productsLoading && products.length > 0) && <ProductsList products={products} totalProducts={totalProducts as number}/>}
              {(!productsLoading && products.length === 0) && <h2>პროდუქტები ვერ მოიძებნა</h2>}
            </div>
          </div>
      </div>
    </div>
  )
}
