import { SortEnum } from '@src/@types/types';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom'
import { useProductFiltersProvider } from '@src/providers/ProductFiltersProvider/useProductFiltersProvider';
import { useEffect, useState } from 'react';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import useGetProducts from '@src/hooks/useGetProducts';
import goBackIcon from '@src/assets/icons/light/category-left-arr.png'
import goBackIconDark from '@src/assets/icons/dark/category-left-arr.png'
import ProductsList from './ProductsList/ProductsList';
import FilterProducts from '@src/features/FilterProducts/FilterProducts';
import SortProducts from '@src/features/SortProducts/SortProducts';
import ProductCardSkeleton from '@src/components/Skeletons/ProductCardSkeleton/ProductCardSkeleton';
import ProductsSortMobile from './ProductsSortMobile/ProductsSortMobile';

export default function Products() {
  const {category} = useParams();
  const {currentPage, pageSize, minPrice, maxPrice, isForSale, setMinPrice, setMaxPrice, defaultMinPrice, defaultMaxPrice} = useProductFiltersProvider();
  const {products, productsLoading, totalProducts, setProducts} = useGetProducts({categoryName: category as string, page: currentPage, pageSize: pageSize, minPrice: minPrice, maxPrice: maxPrice, onlySales: isForSale})
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<SortEnum>(SortEnum.DEFAULT);
  const {lightMode} = useThemeProvider();
  
  /* create array of product skeletons as many as products */
  const productCartSkeletons = Array.from({ length: pageSize }, (_, index) => <ProductCardSkeleton key={index} />);

  function sortProducts() {
    switch (sortOrder) {
      case SortEnum.PRICE_ASC:
        setProducts([...products.sort((a, b) => (a.salePrice || a.price) - ( b.salePrice || b.price))]);
        break;
      case SortEnum.PRICE_DESC:
        setProducts([...products.sort((a, b) => (b.salePrice || b.price) - ( a.salePrice || a.price))]);
        break;
      case SortEnum.TITLE_ASC:
        setProducts([...products.sort((a, b) => a.title.localeCompare(b.title))]);
        break;
      case SortEnum.TITLE_DESC:
        setProducts([...products.sort((a, b) => b.title.localeCompare(a.title))]);
        break;
      case SortEnum.DEFAULT:
        setProducts([...products.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())]);  // sort how the products are first set in the array (most recent at the beginning)
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
    setSortOrder(SortEnum.DEFAULT)
  }, [minPrice, maxPrice, isForSale])

  useEffect(()=> {
    setMinPrice(defaultMinPrice);
    setMaxPrice(defaultMaxPrice);
  }, [category])
  

  return (
    <div className='custom-container pt-[30px] pb-[60px] min-h-[80vh]'>
      <div className='w-full flex flex-col lg:flex-row lg:justify-between items-start lg:items-center'>
        <div className='inline-flex items-center cursor-pointer' onClick={()=> {navigate(-1)}}>
          <img src={lightMode ? goBackIcon : goBackIconDark} alt='go back icon' className='h-full mr-[22px]'/>
          <h2 className='firago-bold text-base leading-[19px] text-black-main dark:text-dark-black-main'>{category}</h2>
        </div>
        {/* desktop sort */}
        <div className='hidden lg:block w-40 h-10'>
          <SortProducts setSortOrder={setSortOrder} sortOrder={sortOrder}/>
        </div>
        {/* mobile sort and filter */}
       <ProductsSortMobile sortOrder={sortOrder} setSortOrder={setSortOrder}/>
      </div>
      <hr className="mt-[24px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
      <div>
          <div>
            <div className='w-full flex'>
              <div className='w-[350px] min-w-[350px] hidden lg:block'>
                <FilterProducts setSortOrder={setSortOrder}/>
              </div>
              {productsLoading ? <div className=' w-full pl-8 lg:w-[760px] xl:w-[800px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-auto'>{productCartSkeletons}</div> :
              (products.length > 0) ? <ProductsList products={products} totalProducts={totalProducts as number}/> :
              <h2 className='pl-8 text-black-main dark:text-dark-black-main firago-semibold text-lg leading-[20px]'><FormattedMessage id='products.not.found'/></h2>}
            </div>
          </div>
      </div>
    </div>
  )
}
