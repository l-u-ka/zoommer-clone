import { SORT_BY_ENUM } from '@src/@types/types';
import useGetProducts from '@src/hooks/useGetProducts';
import { useNavigate, useParams } from 'react-router-dom'
import goBackIcon from '@src/assets/icons/category-left-arr.png'
import ProductsList from './ProductsList/ProductsList';
import FilterProducts from '@src/features/FilterProducts/FilterProducts';
import { useProductFiltersProvider } from '@src/providers/ProductFiltersProvider/useProductFiltersProvider';
import { ReactNode, useEffect, useState } from 'react';
import SortProducts from '@src/features/SortProducts/SortProducts';
import { FormattedMessage } from 'react-intl';
import filterIcon from '@src/assets/icons/filter.png'
import FilterProductsMobile from '@src/features/FilterProducts/FilterProductsMobile';
import ProductCardSkeleton from '@src/components/Skeletons/ProductCardSkeleton/ProductCardSkeleton';

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

  const productCartSkeletons:ReactNode[] = [];
  for (let i = 0; i < pageSize; i++) productCartSkeletons.push(<ProductCardSkeleton key={i}/>)

  function sortProducts() {
  switch (sortOrder) {
    case SORT_BY_ENUM.PRICE_ASC:
      setProducts([...products.sort((a, b) => (a.salePrice || a.price) - ( b.salePrice || b.price))]);
      break;
    case SORT_BY_ENUM.PRICE_DESC:
      setProducts([...products.sort((a, b) => (b.salePrice || b.price) - ( a.salePrice || a.price))]);
      break;
    case SORT_BY_ENUM.TITLE_ASC:
      setProducts([...products.sort((a, b) => a.title.localeCompare(b.title))]);
      break;
    case SORT_BY_ENUM.TITLE_DESC:
      setProducts([...products.sort((a, b) => b.title.localeCompare(a.title))]);
      break;
    case SORT_BY_ENUM.DEFAULT:
      setProducts([...products.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())]);  // sort how the products are first set in the array (most recent at the beginning)
    default:
      break;
  }
}
  console.log(products)

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
          <h2 className='firago-bold text-base leading-[19px] text-black-main dark:text-dark-black-main'>{category}</h2>
        </div>
        {/* desktop sort */}
        <div className='hidden lg:block w-40 h-10'>
          <SortProducts setSortOrder={setSortOrder} sortOrder={sortOrder}/>
        </div>
        {/* mobile sort and filter */}
        <div className='w-full lg:hidden mt-4'>
          <hr className="border border-solid border-border-white dark:border-border-dark-white mb-4"/>
          <div className='flex items-center justify-between'>
            <div className='w-full h-10 mr-8'>
              <SortProducts setSortOrder={setSortOrder} sortOrder={sortOrder}/>
            </div>
            {/* add mobile filter button below*/}
            <div className='w-full'>
              <button className='w-full h-10 border-none px-5 rounded-[30px] cursor-pointer shadow-md bg-light-theme-secondary-bg dark:bg-dark-theme-secondary-bg transition-colors duration-300 ease-in-out' onClick={showFilterModal}>
                <div className='flex justify-start items-center'>
                  <img alt='filter icon' src={filterIcon} className='w-5 mr-[10px]'/>
                  <p className='firago-medium text-xs leading-[14px] text-black-main dark:text-dark-black-main'><FormattedMessage id='filter'/></p>
                </div>
              </button>
              <FilterProductsMobile isModalOpen={filterModal} handleCancel={handleFilterCancel} setSortOrder={setSortOrder}/>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-[24px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
      <div>
          <div>
            <div className='w-full flex'>
              <div className='w-[350px] min-w-[350px] hidden lg:block'>
                <FilterProducts setSortOrder={setSortOrder}/>
              </div>
              {productsLoading && <div className=' w-full pl-8 lg:w-[760px] xl:w-[800px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-auto'>{productCartSkeletons}</div>}
              {(!productsLoading && products.length > 0) && <ProductsList products={products} totalProducts={totalProducts as number}/>}
              {(!productsLoading && products.length === 0) && <h2 className='pl-8 text-black-main dark:text-dark-black-main firago-semibold text-lg leading-[20px]'><FormattedMessage id='products.not.found'/></h2>}
            </div>
          </div>
      </div>
    </div>
  )
}
