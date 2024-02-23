import { CategoryType } from "@src/@types/types";
import { useProductsProvider } from "@src/providers/ProductsProvider/useProductsProvider";
import { useNavigate } from "react-router-dom";
export default function CategoriesTab() {

    const {categories} = useProductsProvider();
    const navigate = useNavigate();

    const tabItems = categories.map((cat:CategoryType, index: number) => {
        const isLastItem = index === categories.length - 1;
    
        return (
            <div key={cat.id} className="w-fullcursor-pointer hover:bg-white-400 px-[10px] first:rounded-t-xl last:rounded-b-xl" onClick={()=> navigate(`/products/${cat.name}`)}>
                <p className={`border-0 ${!isLastItem ? 'border-b' : 'border-b-0'} border-solid border-white-400 py-3 cursor-pointer firago-medium text-xs leading-[14px] text-black-08 opacity-80`}>{cat.name}</p>
            </div>
        );
    });
    

  return (
    <div className=" hidden h-fit lg:block min-w-[246px] rounded-xl shadow-lg dark:bg-[#f28f6a]">
        {tabItems}
    </div>
  )
}
