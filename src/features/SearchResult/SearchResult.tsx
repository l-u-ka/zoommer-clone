import useSearchProducts from "@src/hooks/useSearchProducts";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import LoadingSpinner from "@src/components/LoadingSpinner/LoadingSpinner";
import SearchResultCard from "./SearchResultCard/SearchResultCard";

interface SearchResultProps {
  searchInput: string,
  closeModal: ()=>void
}

export default function SearchResult({searchInput, closeModal}: SearchResultProps) {

  const {searchedProducts, searchLoading, searchProducts, setSearchedProducts} = useSearchProducts();

  const searchedProductDivs = searchedProducts?.map((prod) => {
    return <SearchResultCard key={prod.id} product={prod} closeModal={closeModal}/>
  })

  useEffect(()=> {
    if(searchInput?.length > 3) searchProducts(searchInput)
    else setSearchedProducts([])
  }, [searchInput])

  return (
    <div className="w-full lg:w-[600px] max-h-[440px] overflow-y-auto p-5 rounded-xl bg-light-theme-bg dark:bg-dark-theme-bg border border-solid border-orange-main absolute top-[60px] lg:top-[60px] lg:left-[-70px]">
        <div className="w-full flex mb-4">
          <h4 className="firago-medium text-base leading-[19px] text-black-08 dark:text-dark-black-8"><FormattedMessage id="search.result"/>:</h4>
          {searchLoading && <div className="max-w-10 text-left flex justify-center"><LoadingSpinner size={20} fullscreen={false} custom={true}/></div>}
          {(searchInput?.length > 3 && !searchLoading && searchedProducts?.length >= 1) && <Link onClick={closeModal} to={`/products/search/${searchInput}`} className="no-underline ml-auto firago-medium text-sm leading-[17px] text-orange-main"><FormattedMessage id="view.all"/></Link>}
        </div>
        {(!searchLoading && searchedProducts?.length >=1) && <div className="grid gap-3">
            {searchedProductDivs}
          </div>}
        {(searchInput?.length > 3 && !searchLoading && searchedProducts?.length < 1) && <div className="firago-medium text-black-08 dark:text-dark-black-8 text-sm leading-[17px]"><FormattedMessage id="product.not.found"/></div>}
    </div>
  )
}
