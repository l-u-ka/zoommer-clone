import { TCategory } from "@src/@types/types";
import { useProductsProvider } from "@src/providers/ProductsProvider/useProductsProvider"
import { useNavigate } from "react-router-dom";

export default function CategoriesTabMobile({ isOpen }: {isOpen: boolean }) {

    const {categories} = useProductsProvider();
    const navigate = useNavigate();

    const categorieTabs = categories.map((cat : TCategory) => {
        return <div key={cat.id} onClick={()=>navigate(`/products/${cat.name}`)} className="cursor-pointer bg-white-400 hover:bg-gray-seconday max-w-20 h-[76px] text-center p-2 firago-semibold text-[10px] leading-3 text-black-08 opacity-100 flex flex-col justify-end">
            <p>{cat.name}</p>
        </div>
    })

    return (
        <div className={`absolute top-[52px] left-0 flex flex-col h-screen bg-white-600 transition-all duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}>{categorieTabs}</div>
    )
}
