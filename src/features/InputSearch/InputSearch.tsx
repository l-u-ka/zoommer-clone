import useSearchProducts from "@src/hooks/useSearchProducts";
import { useProductsProvider } from "@src/providers/ProductsProvider/useProductsProvider";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import goToProductArr from '@src/assets/icons/right-path.png'
import { Link, useNavigate } from "react-router-dom";

export default function InputSearch({searchInput, closeModal}: {searchInput: string, closeModal: ()=>void}) {

  // const {searchProducts, searchedProducts, searchLoading, setSearchedProducts} = useProductsProvider();
  const {searchedProducts, searchLoading, searchProducts, setSearchedProducts} = useSearchProducts();
  console.log(searchedProducts)
  const navigate = useNavigate()

  const searchedProductDivs = searchedProducts?.map((prod) => {
    return (
      <div className="w-full bg-[rgb(242,242,242)] p-[6px] flex justify-between items-center cursor-pointer rounded-lg" onClick={()=>{
        navigate(`/products/${prod.category_name}/${prod.id}`)
        closeModal();
        }}>
        <div className="flex">
          <img src={prod.image} alt="searched img photo" className=" w-10 h-10 object-contain"/>
          <div className="flex flex-col justify-between ml-3">
            <h3 className="firago-medium text-xs leading-[14px] text-black-08 opacity-80">{prod.title}</h3>
            <div>
            {!prod.salePrice && <p className="firago-semibold firago-semibold text-sm leading-[17px] opacity-70">{prod.price} ₾</p>}
            {prod.salePrice && (
              <div className="flex">
                <p className="firago-semibold text-base leading-[17px] text-orange-primary mr-2">{prod.salePrice} ₾</p>
                <p className="relative firago-normal text-xs text-black-07 ">
                  {prod.price} ₾
                  <span className="absolute top-2 left-0 right-0 h-[1px] bg-orange-primary transform translate-y-[-50%]"></span>
                </p>
              </div>
            )}
            </div>
          </div>
        </div>
        <img src={goToProductArr} alt="go to product arrow" className="h-3 mr-4"/>
      </div>
    )
  })

  useEffect(()=> {
    if(searchInput?.length > 3) searchProducts(searchInput)
    else setSearchedProducts([])
  }, [searchInput])

  return (
    <div className="w-full lg:w-[600px] max-h-[500px] p-5 rounded-xl bg-light-theme-bg dark:bg-dark-theme-bg border border-solid border-orange-primary absolute top-[60px] lg:top-[60px] lg:left-[-70px]">
        <div className="w-full flex justify-between">
          <h4 className="firago-medium text-sm leading-[17px] text-black-08 dark:text-white-400"><FormattedMessage id="search.result"/>:</h4>
          {(searchInput?.length > 3 && !searchLoading && searchedProducts?.length >= 1) && <Link onClick={closeModal} to={`/products/search/${searchInput}`} className="no-underline firago-medium text-sm leading-[17px] text-orange-primary">ყველას ნახვა</Link>}
        </div>
        {searchLoading && <h3>Loading...</h3>}
        {(!searchLoading && searchedProducts?.length >=1) && <div className="grid gap-3 mt-3">
            {searchedProductDivs}
          </div>}
        {(searchInput?.length > 3 && !searchLoading && searchedProducts?.length < 1) && <div className="firago-medium text-black-08 text-sm leading-[17px] mt-3"><FormattedMessage id="product.not.found"/></div>}
    </div>
  )
}
