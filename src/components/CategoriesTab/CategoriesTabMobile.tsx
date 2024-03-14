import { ProductCategory } from "@src/@types/types";
import { useProductsProvider } from "@src/providers/ProductsProvider/useProductsProvider"
import { useNavigate } from "react-router-dom";

export default function CategoriesTabMobile({ isOpen }: {isOpen: boolean }) {

    const {categories} = useProductsProvider();
    const navigate = useNavigate();

    const categorieTabs = categories.map((cat : ProductCategory) => {
        return ( /* single mobile category tab */
            <div key={cat.id} onClick={()=>navigate(`/products/${cat.name}`)} className="cursor-pointer bg-white-400 dark:bg-dark-white-400 hover:bg-gray-seconday dark:hover:bg-dark-gray-seconday transition-colors duration-300 ease-in-out max-w-20 h-[76px] text-center p-2 opacity-100 flex flex-col justify-end">
                {(cat.image && cat.image !== 'data:image/png;base64,') && <img alt="category icon" src={cat.image} className="w-8 h-8 mx-auto mb-2"/>}
                <p className="firago-semibold text-[10px] leading-3 text-black-08 dark:text-dark-black-8">{cat.name}</p>
            </div>
            )
    })

    return (
        <div className={` absolute top-[52px] left-0 flex flex-col h-screen bg-white-600 dark:bg-dark-theme-bg transition-all duration-500 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}>{categorieTabs}</div>
    )
}
