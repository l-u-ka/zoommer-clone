import { ProductCategory } from "@src/@types/types";
import { useProductsProvider } from "@src/providers/ProductsProvider/useProductsProvider";
import { useNavigate } from "react-router-dom";

export default function CategoriesTab() {

    const {categories} = useProductsProvider();
    const navigate = useNavigate();

    const tabItems = categories.map((cat:ProductCategory, index: number) => {
        const isLastItem = index === categories.length - 1;
        return (
            /* single category tab */
            <div key={cat.id} className={`border-0 ${!isLastItem ? 'border-b' : 'border-b-0'} border-solid border-border-white dark:border-border-dark-white flex items-center w-full cursor-pointer hover:bg-white-400 dark:hover:bg-dark-black-06 transition-colors duration-300 ease-in-out px-[10px] first:rounded-t-xl last:rounded-b-xl`} onClick={()=> navigate(`/products/${cat.name}`)}>
                {(cat.image && cat.image !== 'data:image/png;base64,') && <img src={cat.image} alt="category icon" className="w-6 h-5 object-contain mr-3"/>}
                <p className={`py-3 firago-medium text-xs leading-[14px] text-black-08 dark:text-dark-black-8 opacity-80`}>{cat.name}</p>
            </div>
        );
    });
    
  return (
    <div className=" hidden h-fit lg:block min-w-[246px] rounded-xl shadow-lg dark:bg-dark-white-400 transition-colors duration-300 ease-in-out">
        {tabItems}
    </div>
  )
}
