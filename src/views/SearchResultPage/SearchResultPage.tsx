import ProductCard from '@src/components/ProductCard/ProductCard';
import ProductCardSkeleton from '@src/components/Skeletons/ProductCardSkeleton/ProductCardSkeleton';
import useSearchProducts from '@src/hooks/useSearchProducts';
import { ReactNode, useEffect } from 'react'
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

export default function SearchResultPage() {

  const {searchValue} = useParams();
  const {searchProducts, searchLoading, searchedProducts} = useSearchProducts();

  useEffect(()=> {
    searchProducts(searchValue as string)
  }, [searchValue])

  const productSkeletons: ReactNode[] = [];
  for (let i=0; i < 6; i++) {
    productSkeletons.push(<ProductCardSkeleton key={i}/>)
  }

  const searchedProductCards = searchedProducts?.map(prod=> {
    return <ProductCard key={prod.id} product={prod} />
  })

  return (
    <div className='custom-container pt-[30px] pb-[60px] min-h-[700px]'>
      <div className='mb-10'>
        <h4 className='firago-medium text-black-06 dark:text-dark-black-06 text-xs leading-[14px] mb-[15px]'><FormattedMessage id="search.result"/></h4>
        {!searchLoading && <h3 className='firago-medium text-base leading-[14px] text-black-main dark:text-dark-black-main'> <FormattedMessage id='found'/> {searchedProducts?.length} <FormattedMessage id='results'/> <span className=' text-orange-main dark:text-text-dark-orange-main'>{searchValue}</span></h3>}
      </div>
      {searchLoading && <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>{productSkeletons}</div>}
      {(!searchLoading && searchedProducts.length >= 1) && (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
          {searchedProductCards}
        </div>
      )}
      {(!searchLoading && searchedProducts.length < 1) && <p className='firago-semibold text-base leading-5 dark:text-white-400'><FormattedMessage id='product.not.found'/></p>}
    </div>
  )
}
