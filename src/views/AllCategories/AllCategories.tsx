import { CategoryType } from "@src/@types/types";
import { useProductsProvider } from "@src/providers/ProductsProvider/useProductsProvider"
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export default function AllCategories() {

    const {categories} = useProductsProvider();
    const categoryElements = categories.map((cat:CategoryType) => {
        return <Link key={cat.id} to={`/products/${cat.name}`} className="no-underline firago-semibold text-text-blue text-lg hover:text-orange-primary transition-all duration-200 ease-in-out delay-0">{cat.name}</Link>
    })

    return (
        <div className="custom-container pt-[30px] pb-[60px] min-h-[700px]">
            <h3 className="firago-medium text-base text-text-blue leading-6"><FormattedMessage id="all.categories"/></h3>
            <hr className="mt-[20px] mb-[30px] border border-solid border-white-400"/>
            <div className="grid grid-cols-4 gap-y-7">{categoryElements}</div>
        </div>
    )
}
