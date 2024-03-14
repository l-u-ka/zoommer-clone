import { useNavigate } from 'react-router-dom';
import goToProductArr from '@src/assets/icons/light/right-path.png'
import goToProductArrDark from '@src/assets/icons/dark/right-path.png'
import { Product } from '@src/@types/types';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';

interface SearchResultCardProps {
    product: Product;
    closeModal: ()=>void;
}

export default function SearchResultCard({product, closeModal}: SearchResultCardProps) {
    const {lightMode} = useThemeProvider();
    const navigate = useNavigate();

    return (
        <div key={product.id} className="w-full bg-white-400 dark:bg-dark-white-400 p-[6px] flex justify-between items-center cursor-pointer rounded-lg" onClick={()=>{
            navigate(`/products/${product.category_name}/${product.id}`)
            closeModal();
            }}>
            <div className="flex">
              <img src={product.image} alt="searched img photo" className=" w-10 h-10 object-contain"/>
              <div className="flex flex-col justify-between ml-3">
                <h3 className="firago-medium text-xs leading-[14px] text-black-08 dark:text-dark-black-8 opacity-80">{product.title}</h3>
                <div>
                {!product.salePrice && <p className="firago-semibold firago-semibold text-sm leading-[17px] opacity-70 text-black-main dark:text-dark-black-main">{product.price} ₾</p>}
                {product.salePrice && (
                  <div className="flex">
                    <p className="firago-semibold text-base leading-[17px] text-orange-main dark:text-text-dark-orange-main mr-2">{product.salePrice} ₾</p>
                    <p className="relative firago-normal text-xs text-black-07 dark:text-dark-black-07 ">
                      {product.price} ₾
                      <span className="absolute top-2 left-0 right-0 h-[1px] bg-orange-main transform translate-y-[-50%]"></span>
                    </p>
                  </div>
                )}
                </div>
              </div>
            </div>
            <img src={lightMode ? goToProductArr : goToProductArrDark} alt="go to product arrow" className="h-3 mr-4"/>
        </div>
    )
}
